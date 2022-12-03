import { productSer } from "./service/main.service.js";
import { validation } from "./validation/index.validtion.js";
const {checkEmpty , checkValidNumber , checkValidText} = validation ; 
const getAPI = () => {
    productSer.getProducList().then(res => {
        
        renderTable(res.data) ; 
    }).catch(err => console.log(err)) ; 
}
const renderTable = (arr) => {
    let content = '' ; 
    arr.map(product => {
        const {id , name , amount , price , sale} = product ;
        content += `
        <tr>
                <td scope="row">${id}</td>
                <td scope="row">${name}</td>
                <td scope="row">${amount}</td>
                <td scope="row">${price}</td>
                <td scope="row">${sale}</td>
                <td scope="row">
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "detailProduct(${id})"  class="btn btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick = "deleteProduct(${id})" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
              </tr>
        ` ;
    });
    document.getElementById("tbody").innerHTML = content ; 
}
getAPI() ; 
document.getElementById("btn-open-add").addEventListener('click' ,()=>{
    renderButton("add") ; 
}) ; 
const addNewProduct = () => {
    let inputEles = document.querySelectorAll(".my-input-form") ; 
    let newProduct = {} ; 
    for(let i = 0 ; i < inputEles.length ; i++) {
        const {name , value} = inputEles[i] ; 
        newProduct = {...newProduct , [name] : value}
    }
    // validation trước khi thêm sản phẩm
    let isValid = true ; 
    for (const key in newProduct) {
       isValid &= checkEmpty(`err-${key}` , newProduct[key]) ; 
    }
    console.log("isValid" , isValid) ; 
        if(isValid) {
            for (const key in newProduct) {
                if(key === "name") isValid &= checkValidText(`err-${key}` , newProduct[key]) ; 
                else {
                   if (key === "amount" || key === "price") isValid &= checkValidNumber(`err-${key}` , newProduct[key]) ; 
                } ; 
            }
        }
        
         console.log("isValid" , isValid) ;
    

     

    if(isValid){
        productSer.addNewProduct(newProduct).then(res => {
            document.querySelector(".btn-close").click() ; 
            document.querySelector("form").reset();  
            getAPI() ; 
        }).catch(err => {
            console.log(err) ; 
        })
    }

    
}
window.addNewProduct = addNewProduct ;
// document.getElementById("btn-addProduct").onclick = () => {
//     console.log('ưefwef') ; 
// } ; 

const deleteProduct = (id) => {
    productSer.deleteProduct(id).then(res => {
        console.log(res) ; 
        getAPI() ; 
    }).catch(err => console.log(err)) ; 
}
window.deleteProduct = deleteProduct ; 
const renderButton = (action , id = null) => {
    if(action === "edit") {
        document.querySelector(".modal-footer").innerHTML = `
        <button onclick = "updateProduct(${id})" id="btn-update" type="button" class="btn btn-outline-success">Cập nhật</button>
        ` ;
    }else {
        document.querySelector(".modal-footer").innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button onclick = "addNewProduct()" id="btn-addProduct" type="button" class="btn btn-primary">Thêm sản phẩm</button>
        ` ;
    }
}
const detailProduct = (id) => {
    console.log(id) ; 
    productSer.getProductDetail(id).then(res => {
        renderButton("edit" , id) ; 
        let productCurrent = res.data ; 
        let inputEles = document.querySelectorAll(".my-input-form") ;  
        for(let i = 0 ; i < inputEles.length ; i++) {
            let {name , id} = inputEles[i] ; 
            document.getElementById(id).value = productCurrent[name] ; 
        }
        
    }).catch(err => console.log(err)) ; 
}
window.detailProduct = detailProduct ; 

const updateProduct = (id) => {
    console.log(id) ; 
    let inputEles = document.querySelectorAll(".my-input-form") ;
    let productWillUpdate = {} ; 
    for(let i = 0 ; i < inputEles.length ; i++) {
        const {name , value} = inputEles[i] ; 
        productWillUpdate = {...productWillUpdate , [name] : value}
    }
    console.log('product will update' , productWillUpdate) ; 
    let isValid = true ; 
    for (const key in productWillUpdate) {
       isValid &= checkEmpty(`err-${key}` , productWillUpdate[key]) ; 
    }
 
        if(isValid) {
            for (const key in productWillUpdate) {
                if(key === "name") isValid &= checkValidText(`err-${key}` , productWillUpdate[key]) ; 
                else {
                   if (key === "amount" || key === "price") isValid &= checkValidNumber(`err-${key}` , productWillUpdate[key]) ; 
                } ; 
            }
        }
    if(isValid) {
        productSer.updateProduct(id , productWillUpdate ).then(()=>{
            document.querySelector(".btn-close").click() ;
            getAPI() ;
           
        }).catch(err => console.log(err)) ; 
    }  
 
}
window.updateProduct = updateProduct ; 




