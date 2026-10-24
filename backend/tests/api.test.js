const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../src/server');

let server;
let baseUrl;

test.before(async () => {
  // Start server on an ephemeral port
  server = app.listen(0);
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  if (server) {
    server.close();
  }
});

test('GET /api/health returns operational status', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, 'Operational');
  assert.ok(data.service.includes('AgriFusion AI'));
});

test('POST /api/auth/login with academic evaluator credentials', async () => {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'evaluator@university.edu',
      password: 'AgriFusion@2026'
    })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.user.email, 'evaluator@university.edu');
  assert.equal(data.user.role, 'evaluator');
  assert.ok(data.token);
});

test('POST /api/auth/register and authenticate new researcher', async () => {
  const testEmail = `researcher_${Date.now()}@university.edu`;
  const regRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr. Alan Turing',
      email: testEmail,
      password: 'SecureResearchPassword2026',
      role: 'researcher',
      institution: 'Department of Computer Science & Engineering'
    })
  });
  assert.equal(regRes.status, 201);
  const regData = await regRes.json();
  assert.equal(regData.user.name, 'Dr. Alan Turing');
  assert.ok(regData.token);

  // Verify GET /api/auth/me
  const meRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${regData.token}` }
  });
  assert.equal(meRes.status, 200);
  const meData = await meRes.json();
  assert.equal(meData.user.email, testEmail);
});

test('GET /api/environment/weather returns valid meteorological parameters', async () => {
  const res = await fetch(`${baseUrl}/api/environment/weather?lat=28.6139&lon=77.2090`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(typeof data.temperature === 'number');
  assert.ok(typeof data.relativeHumidity === 'number');
  assert.ok(data.source);
});

test('GET /api/environment/soil returns ISRIC SoilGrids parameters', async () => {
  const res = await fetch(`${baseUrl}/api/environment/soil?lat=28.6139&lon=77.2090`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.dataSource, 'ISRIC World Soil Information - SoilGrids 250m');
  assert.ok(data.phH2O);
  assert.ok(data.organicCarbon);
});

test('GET /api/risk/forecast returns 7-day epidemiological risk trend', async () => {
  const res = await fetch(`${baseUrl}/api/risk/forecast?lat=28.6139&lon=77.2090&crop=Tomato`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.forecast);
  assert.equal(data.forecast.length, 7);
  assert.ok(data.modelBasis.includes('Wallin'));
  assert.ok(data.agronomicDisclaimer);
});

test('GET /api/analyses returns seeded history records', async () => {
  const res = await fetch(`${baseUrl}/api/analyses`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
  assert.ok(data.length >= 1);
  assert.ok(data[0].predictedClass);
  assert.ok(data[0].crop);
});

test('POST /api/predictions/classify without file returns 400 Bad Request', async () => {
  const res = await fetch(`${baseUrl}/api/predictions/classify`, {
    method: 'POST'
  });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.ok(data.message.includes('required') || data.message.includes('Invalid'));
});
