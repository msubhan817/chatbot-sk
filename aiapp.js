let propt = document.querySelector("#prompt")
let submitt = document.querySelector("#submit")
let chatcontainer = document.querySelector(".chat-container") 
let buttonimg = document.querySelector("#img") 
let image = document.querySelector("#img img") 
let imginput =  document.querySelector("#img input")
const api_url= "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBQtKtIt9nFdx8KV01oWTCAyhBMxa09fU8"

let user={
    message:null,
    file:{
         mime_type:null,
          data: null
    }
}
async function genrateresponsa(aichatbox) {
    let text = aichatbox.querySelector(".ai-chatarea")

    let request = {
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [{
              "parts":[{"text":user.message},(user.file.data?[{ "inline_data":user.file}]:[])

              ]
              }]
             })}

             try {
                let response = await fetch(api_url,request)
                let data = await response.json()
               let apiresponce = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
              text.innerHTML= apiresponce
                
                
             } catch (error) {
                console.log(error);
                
             }
             finally{
                chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
                image.src= `img.svg` 
                image.classList.remove("xclass")
                user.file ={}
             }

    
    
}
  

function createchatbox(html,classes){
    let div= document.createElement("div")
    div.innerHTML= html
    div.classList.add(classes)
    return div
}


function chatresponcehandel(message){
    user.message= message
    let html =` <img src="—Pngtree—user avatar silhouette_14666150.png" alt="" id="user-image" width="10%">
            <div class="user-chatarea">
             ${user.message}  ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}"class="choseimg"/ >`:""}

            </div>`
            propt.value= ""
            let userchatbox=createchatbox(html,"user-chatbox")
            chatcontainer.appendChild(userchatbox)
            chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})

            setTimeout(()=>{
                let html = ` <img src="—Pngtree—3d cute small robot on_17775821.png" alt="" id="ai-image" width="8%">
            <div class="ai-chatarea">
            <img src="load-38_256.gif" alt="" class="load" width="50px">
               
            </div>`
             let aichatbox = createchatbox(html,"ai-chatbox")
             chatcontainer.appendChild(aichatbox)
             genrateresponsa(aichatbox)
            },600)
            

}

propt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
       chatresponcehandel(propt.value)
        
    }
   
   
})
submitt.addEventListener("click",()=>{
    chatresponcehandel(propt.value)

})

imginput.addEventListener("change",()=>{
    const file = imginput.files[0]
    if(!file) return
    let reader = new FileReader()
    reader.onload = (e)=>{
     let bas64string = e.target.result.split(",")[1]
     user.file={
        mime_type:file.type,
        data: bas64string

     }
     image.src= `data:${user.file.mime_type};base64,${user.file.data}` 
     image.classList.add("xclass")

    }
    reader.readAsDataURL(file)
   
})

buttonimg.addEventListener("click",()=>{
    buttonimg.querySelector("input").click()
})