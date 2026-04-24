import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file)
       {
      const reader = new FileReader();   // => convert to data
      reader.readAsDataURL(file);   //=> data convert to base64
      reader.onload = (event) => {  //=>file complete after run
        const img = new Image();
     
        img.src = event.target.result;
       
        img.onload = () => {
    
          const canvas = document.createElement("canvas");
          const defultwidth = 500; 
          
          if(img.width >defultwidth)
            {
          const scaleSize = defultwidth / img.width;
         
          canvas.width = defultwidth;
          canvas.height = img.height * scaleSize;
          }

          const resize = canvas.getContext("2d");
          resize.drawImage(img, 0, 0, canvas.width, canvas.height);


          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
          setImage(compressedBase64);
          console.log(compressedBase64)
        };
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
     toast.error("Please fill all fields", {
  position: "top-right",
  autoClose: 1000,
});
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      image
    };

    axios.post("http://localhost:3000/product", newProduct)
      .then(() => {
       toast.success("Product added successfully!");

        setName(""); 
        setPrice(""); 
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
    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field"
    />
    <br /><br />

    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field"
    />
    <br /><br />

    <input type="file" accept="image/*" onChange={handleImage} className="file-input" />

    <br /><br />
  </div>

  {image && (<img src={image} width="100" className="preview-image"/>)}

  <br />

 
  <button type="submit" className="submit-btn"> Upload Product</button>
 <ToastContainer/>
</form>

  );
}

export default AddProduct;