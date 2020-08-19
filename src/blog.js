class Blog{
    
    constructor(){
        this.setInitVariables();
        this.registerEvents();
        this.likedSet = new Set();
    }
    setInitVariables(){
        this.blogList = document.querySelector(".blogList > ul");
    }
    registerEvents(){
        const button = document.querySelector(".start");
        const dataUrl = "/data/data.json";

        button.addEventListener("click", () => this.setInitData(dataUrl));
        
        this.blogList.addEventListener("click", ({target})=>{
            const targetClassName = target.className;
            const postTitle = target.previousElementSibling.textContent;
            if(targetClassName !== "like" && targetClassName !== "unliked" && postTitle !== undefined) return;

            if(targetClassName === "unliked"){
                target.className = "like";
                target.innerHTML = "찜하기";
                this.likedSet.delete(postTitle);
            }else{
                this.likedSet.add(postTitle);
                target.className = "unliked";
                target.innerHTML = "찜취소";
            }
            this.updateLikedList();
        });
    }
    setInitData(dataUrl){
        this.getData(dataUrl, this.insertPosts.bind(this));
    }
    getData(dataUrl, callback){
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", ()=>{
            const list = JSON.parse(oReq.responseText).body; 
            callback(list);
        });

        oReq.open("GET", dataUrl);
        oReq.send();
    }
    insertPosts(list) {
        this.blogList.innerHTML = ""; 
        list.forEach(blog=>{
            this.blogList.innerHTML += `<li><a href=${blog.link}>${blog.title}</a> <div class="like">찜하기</div></li>`;
        });
    }
    updateLikedList(){
        const ul = document.querySelector(".like-list > ul");
        let likedSum
        this.likedSet.forEach(like=>{
            likedSum += `<li>${like}</li>`;
        })
        ul.innerHTML = likedSum;
    }
}

export default Blog;