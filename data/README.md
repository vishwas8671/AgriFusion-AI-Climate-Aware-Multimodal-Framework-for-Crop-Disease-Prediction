# AgriFusion AI — Dataset Acquisition & Management Guide

## Supported Datasets

### 1. PlantVillage Dataset
- **Citation**: Hughes, D. P., & Salathé, M. (2015). *An open access repository of images on plant health to enable the development of mobile disease diagnostics.* arXiv preprint arXiv:1511.08060.
- **License**: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
- **Scale**: 54,303 high-resolution images across 38 crop disease and healthy classes.
- **Acquisition**: Downloadable via [Kaggle PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease) or official [Spudnik/PlantVillage GitHub](https://github.com/spMohanty/PlantVillage-Dataset).

### 2. PlantDoc Dataset
- **Citation**: Singh, D., Jain, N., Jain, P., Kayal, P., Kumawat, S., & Batra, N. (2020). *PlantDoc: A Dataset for Visual Plant Disease Detection in the Wild.* CoDS-COMAD 2020.
- **License**: MIT License.
- **Scale**: 2,598 images across 17 disease classes captured in in-field agricultural conditions.
- **Acquisition**: Available on [GitHub: pratikkayal/PlantDoc-Dataset](https://github.com/pratikkayal/PlantDoc-Dataset).

### 3. Rice Leaf Diseases Dataset
- **Citation**: Prajapati, H. B., Dabhi, V. K., & Prajapati, S. (2017). *A survey on detection and classification of rice plant diseases.* Journal of Agricultural Informatics.
- **License**: Public Domain / Academic Research.
- **Scale**: 120 images (Bacterial Leaf Blight, Brown Spot, Leaf Smut).
- **Acquisition**: Available on [UCI Machine Learning Repository](https://archive.ics.uci.edu/dataset/547/rice+leaf+diseases).

---

## Directory Organization For Custom Training

To fine-tune EfficientNet-B0 with custom images, organize your directory using the standard PyTorch `ImageFolder` structure:

```
data/
  dataset/
    train/
      Tomato___Early_blight/
        img_001.jpg
        img_002.jpg
      Tomato___Late_blight/
      Tomato___healthy/
      Potato___Early_blight/
      Potato___Late_blight/
      Potato___healthy/
    val/
      Tomato___Early_blight/
      ...
    test/
      Tomato___Early_blight/
      ...
```

Run training:
```bash
python ml-service/training/train.py --data_dir ./data/dataset --epochs 10 --batch_size 8
```
