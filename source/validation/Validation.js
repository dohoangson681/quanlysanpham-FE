const errMsgCheckEmpty = "*Trường này không được để trống !" ; 
const errMsgValidText = "*Tên không hợp lệ !" ; 
const errMsgValidNumber = "*Chỉ được phép nhập số !" ; 

const regexNumber = /^[0-9]+$/ ; 
const regexText = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/ ; 
export default class ValidationForm {
    checkEmpty = (idErrMsg , value ) => {
        if(value.trim() === ""){
            // nếu trường nhập trống
            document.getElementById(idErrMsg).innerHTML = errMsgCheckEmpty ; 
            document.getElementById(idErrMsg).style.display = "block" ;
            return false ;
        }else {
            document.getElementById(idErrMsg).style.display = "none" ;
            return true ; 
        }
    }

    checkValidText = (idErrMsg , value) => {
        if(!regexText.test(value)) {
            document.getElementById(idErrMsg).innerHTML = errMsgValidText ; 
            document.getElementById(idErrMsg).style.display = "block" ;
            return false ;
        }else {
            document.getElementById(idErrMsg).style.display = "none" ;
            return true ;
        }
    }

    checkValidNumber = (idErrMsg , value) => {
        if(!regexNumber.test(value)) {
            document.getElementById(idErrMsg).innerHTML = errMsgValidNumber ; 
            document.getElementById(idErrMsg).style.display = "block" ;
            return false ;
        }else {
            document.getElementById(idErrMsg).style.display = "none" ;
            return true ;
        }
    }
}