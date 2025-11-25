const menuIcon=document.getElementById("menuIcon");
const menuList=document.getElementById("menuList");
const selectedText=document.getElementById("selectedText");

menuIcon.addEventListener("click",()=>{
  const open = menuList.style.display==="block";
  menuList.style.display= open ? "none" : "block";
  menuIcon.style.transform= open ? "rotate(0deg)" : "rotate(180deg)";
});

document.querySelectorAll("#menuList li").forEach(item=>{
  item.addEventListener("click",()=>{
    selectedText.textContent=item.dataset.name;
    menuList.style.display="none";
    menuIcon.style.transform="rotate(0deg)";
  });
});
