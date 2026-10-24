import io
import base64
import torch
import torch.nn.functional as F
import numpy as np
from PIL import Image
import matplotlib.cm as cm

class GradCAM:
    """
    Grad-CAM: Visual Explanations from Deep Networks via Gradient-based Localization
    Reference: Selvaraju et al., ICCV 2017
    """
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self._register_hooks()

    def _register_hooks(self):
        def forward_hook(module, input, output):
            self.activations = output.detach()

        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0].detach()

        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)

    def generate(self, input_tensor: torch.Tensor, class_idx: int = None) -> np.ndarray:
        """
        Generates Grad-CAM activation heatmap for the given input tensor and class index.
        """
        self.model.eval()
        self.model.zero_grad()

        # Forward pass
        output = self.model(input_tensor)

        if class_idx is None:
            class_idx = torch.argmax(output, dim=1).item()

        # Backpropagation for target class
        score = output[0, class_idx]
        score.backward(retain_graph=True)

        # Spatial Global Average Pooling of gradients
        # gradients shape: (1, Channels, Height, Width)
        pooled_gradients = torch.mean(self.gradients, dim=[0, 2, 3])

        # Weight the activations by pooled gradients
        activations = self.activations[0] # (Channels, Height, Width)
        for i in range(pooled_gradients.size(0)):
            activations[i, :, :] *= pooled_gradients[i]

        # Channel-wise summation
        heatmap = torch.sum(activations, dim=0).cpu().numpy()

        # Apply ReLU (retain positive activations only)
        heatmap = np.maximum(heatmap, 0)

        # Normalize between 0.0 and 1.0
        max_val = np.max(heatmap)
        if max_val > 0:
            heatmap /= max_val

        return heatmap

    @staticmethod
    def overlay_heatmap(original_image: Image.Image, heatmap: np.ndarray, alpha: float = 0.5) -> Image.Image:
        """
        Resizes heatmap to match original image, applies Jet colormap, and returns blended PIL image.
        """
        width, height = original_image.size
        # Resize heatmap using PIL
        heatmap_img = Image.fromarray(np.uint8(255 * heatmap))
        heatmap_resized = heatmap_img.resize((width, height), resample=Image.Resampling.BILINEAR)
        heatmap_norm = np.array(heatmap_resized) / 255.0

        # Apply Jet colormap (Blue=Low, Yellow/Red=High Attention)
        colormap = cm.get_cmap('jet')
        heatmap_colored = colormap(heatmap_norm)[:, :, :3] # discard alpha
        heatmap_colored = np.uint8(255 * heatmap_colored)
        heatmap_pil = Image.fromarray(heatmap_colored)

        # Blend
        blended = Image.blend(original_image.convert('RGB'), heatmap_pil, alpha=alpha)
        return blended

    @staticmethod
    def to_base64(image: Image.Image) -> str:
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG", quality=90)
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return f"data:image/jpeg;base64,{img_str}"
