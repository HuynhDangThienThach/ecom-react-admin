import React, {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
      name: "",
      image: "",
      category: "giadungbep",
      new_price: "",
      old_price: "",
    });

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value});
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        
        let formData = new FormData();
        formData.append('product', image);

        await fetch ('https://ecom-shopgd.onrender.com/upload', {
            method:"POST",
            headers:{
                Accept: 'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data});
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
        }
        await fetch("https://ecom-shopgd.onrender.com/addproduct", {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => {
            data.success ? alert("Product Added") : alert("Failed");
          });
        
    }

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Tên sản phẩm</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Nhập vào..." />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Giá cũ</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Nhập vào..." />
        </div>
        <div className="addproduct-itemfield">
          <p>Giá mới</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Nhập vào..." />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Loại sản phẩm</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
          <option value="giadungbep">Gia dụng bếp</option>
          <option value="thietbibep">Thiết bị bếp</option>
          <option value="thietbiphong">Thiết bị phòng</option>
          <option value="noichao">Nồi chảo</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={() => {Add_Product()}} className="addproduct-btn">Xác nhận</button>
    </div>
  );
}

export default AddProduct
