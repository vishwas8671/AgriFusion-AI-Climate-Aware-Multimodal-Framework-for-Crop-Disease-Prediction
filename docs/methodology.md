# DATASET & MACHINE LEARNING METHODOLOGY
## AgriFusion AI: Climate-Aware Multimodal Crop Disease Prediction and Early Warning System

---

### 1. Mathematical Formulation of the Vision Classifier

#### 1.1 EfficientNet-B0 Compound Scaling
Standard convolutional networks scale depth ($d$), width ($w$), or image resolution ($r$) arbitrarily. EfficientNet-B0 (Tan & Le, 2019) introduces **compound scaling**, where all three dimensions are scaled uniformly under a fixed resource constraint:

$$\text{depth: } d = \alpha^\phi, \quad \text{width: } w = \beta^\phi, \quad \text{resolution: } r = \gamma^\phi$$

Subject to:
$$\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2, \quad \alpha \ge 1, \beta \ge 1, \gamma \ge 1$$

For EfficientNet-B0 ($\phi = 1$), the baseline parameters are optimized as $\alpha = 1.2$, $\beta = 1.1$, and $\gamma = 1.15$ using Mobile Inverted Bottleneck Convolution (MBConv) blocks with Squeeze-and-Excitation (SE) optimization.

#### 1.2 Transfer Learning & Classification Head
1. **Feature Extractor**: Pre-trained on ImageNet-1K (1.28M natural images), leveraging low-level Gabor-like filters (edges, color gradients, textures) in early stages.
2. **Classifier Head**: The original 1000-class ImageNet linear projection is replaced by:
   $$\mathbf{z} = \mathbf{W}_2 \cdot \text{Dropout}_{0.2}(\mathbf{h}) + \mathbf{b}_2, \quad \mathbf{z} \in \mathbb{R}^{28}$$
3. **Softmax Output**:
   $$\hat{y}_c = \frac{e^{z_c}}{\sum_{j=1}^{C} e^{z_j}}$$

---

### 2. Grad-CAM Spatial Explainability

Gradient-weighted Class Activation Mapping (Selvaraju et al., 2017) generates visual explanations for decisions made by convolutional neural networks.

1. **Gradient Computation**: Compute the gradient of the unnormalized score for target disease class $c$ ($y^c$) with respect to feature activation map $A^k$ of the final convolutional layer:
   $$\frac{\partial y^c}{\partial A^k}$$

2. **Neuron Importance Weights ($\alpha_k^c$)**:
   $$\alpha_k^c = \frac{1}{Z} \sum_{i=1}^{U} \sum_{j=1}^{V} \frac{\partial y^c}{\partial A_{i,j}^k}$$
   Where $Z = U \times V$ represents the spatial dimensions of the feature map (7x7 in EfficientNet-B0).

3. **Weighted Linear Combination & Rectification**:
   $$L_{\text{Grad-CAM}}^c = \text{ReLU}\left( \sum_{k} \alpha_k^c A^k \right)$$
   The $\text{ReLU}$ non-linearity ensures that only spatial features having a positive correlation with the target disease class contribute to the visualization.

---

### 3. Epidemiological Microclimate Risk Modeling

Rather than treating meteorological data as an arbitrary black-box vector, AgriFusion AI grounds environmental risk in established phytopathological infection criteria:

#### 3.1 Wallin (1962) / Hyre (1954) Late Blight Model
Late blight (*Phytophthora infestans*) zoospores require free water or high relative humidity ($\ge 85\%$) and cool-to-moderate temperatures for cyst germination and host penetration.

**Daily Severity Values (DSVs)** are computed from:
- **Temperature Optimum Window**: $15^\circ\text{C} \le T \le 22^\circ\text{C}$ (Peak sporulation index = 35)
- **Leaf Wetness Proxy**: Continuous relative humidity $\ge 88\%$ or rainfall $\ge 5.0\text{ mm}$ (Wetness index = 50)
- **Accumulated Risk Score ($R$)**:
  $$R = S_{\text{temp}} + S_{\text{moisture}} \in [0, 100]$$

| Risk Score Range | Category | Epidemiological Interpretation |
| :--- | :--- | :--- |
| **0 – 49%** | **Low** | Sporulation and spore motility inhibited by sub-threshold humidity. |
| **50 – 74%** | **Moderate** | Dew periods permit localized incubation; preventive scouting advised. |
| **75 – 100%** | **High** | Critical infection conditions; immediate contact fungicide shield recommended. |

---

### 4. Dataset Preparation & Leakage Prevention Protocol

1. **Stratified Split**: 70% Train, 15% Validation, 15% Holdout Test with random seed 42.
2. **Augmentation Isolation**: Transformations (RandomHorizontalFlip, RandomRotation(15°), ColorJitter) are applied exclusively to training batches. Evaluation images are resized without distortion to preserve ground-truth evaluation fidelity.
3. **Class Imbalance Handling**: CrossEntropyLoss with label smoothing (0.1) prevents overconfident predictive margins on dominant classes.
