import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Product.css'

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); 
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (event) => {

        const img = new Image();
     
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const defultwidth = 500; 
          
          canvas.width = img.width;
          canvas.height = img.height;

          if (img.width > defultwidth) {
            const scaleSize = defultwidth / img.width;
            canvas.width = defultwidth;
            canvas.height = img.height * scaleSize;
          }

          const resize = canvas.getContext("2d");
          resize.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
          setImage(compressedBase64);
        };
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !price || !category || !image) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      category, 
      image
    };

    axios.post("https://smartshop-api-oas7.onrender.com/product", newProduct)
      .then(() => {
        toast.success("Product added successfully!", {
          autoClose: 800
        });

        setName(""); 
        setPrice(""); 
        setCategory(""); 
        setImage("");
      })
      .catch(err => {
        console.error(err);
        toast.error("Upload failed.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2 className="form-title">Add Product</h2>

      <div className="product-input">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="input-field"
        />
        <br /><br />

        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="input-field"
        /> 
        <br /><br />

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="input-field category-select"
        >
          <option value="" disabled>Select Category</option>
          <option value="">None</option>
          <option value="Computer">Computer</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Cloth">Cloth</option>
          <option value="Footwear">Footwear</option>
          <option value="Audio">Audio</option>
          <option value="Gaming">Gaming</option>
        </select>
        <br /><br />

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImage} 
          className="file-input" 
        />
        <br /><br />
      </div>

      {image && (<img src={image} width="100" className="preview-image" alt="Preview"/>)}
      <br />

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
}

export default AddProduct;