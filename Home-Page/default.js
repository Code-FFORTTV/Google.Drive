/*
location.href:
"https://forums.maximsokransky.repl.co/path/to/index.php",

location.pathname:
"/path/to"
*/




if(window.location.protocol!=="https:")
window.location.protocol="https:";
//if(window.location.host!=="forums.maximsokransky.repl.co")
//window.location.host="forums.maximsokransky.repl.co";

let NavItems=[
//Left side:
["Home","/home"],
["Rules","/threads/5303414577"],

//Right side (remember to set each array's third item to TRUE):
];

const AnonymousItems=[
["Log in","/login",true],
["Register","/register",true]
];


//Begin check cookies
var cookies=document.cookie.split("; "),
cookiesobj={};

for(var i=0;i<cookies.length;i++){
var arr=cookies[i].split("=");
cookiesobj[arr[0]]=arr[1];
}

let IsMod = false;
let IsAdmin = false;
if(cookiesobj["mod"] == "1")
IsMod = true;
if(cookiesobj["adm"] == "1"){
IsMod = true;
IsAdmin = true;
}

if(cookiesobj["cc"]!=="1"){
FocusPopup("Welcome to THJ GAME HUB ");

document.cookie="cc=1;expires="+(new Date(Date.now()+(20*24*60*60*1000)).toUTCString())+";path=/";
}

if(cookiesobj["usr"]&&cookiesobj["pwd"]){

var UsernameParts=cookiesobj["usr"].split("."),
PasswordParts=cookiesobj["pwd"].split(".");

var FixedUsername="",
FixedPassword="";


for(var i=0;i<UsernameParts.length;i++){
FixedUsername+=String.fromCharCode(UsernameParts[i]);
}
for(var j=0;j<PasswordParts.length;j++){
FixedPassword+=String.fromCharCode(PasswordParts[j]);
}

const UserItems=[
[FixedUsername, [["Account", "/account"], ["Profile", "/user/" + FixedUsername]], true],
["Log out", "javascript:InitLogOut()", true]
];

NavItems=NavItems.concat(UserItems);


if(Math.floor(Math.random()*4)==0&&!cookiesobj["ifp"]){
LNoticeBox({msg:"Could you give us feedback about our website?",buttons:[["Yes"],"No"]},e=>{
document.cookie="ifp=1;expires="+(new Date(Date.now()+(20*24*60*60*1000)).toUTCString())+";path=/";

if(e==0){

function TryGotoForm(GFRetries){
GFRetries=GFRetries||0;

window.location.href="https://docs.google.com/forms/d/e/1FAIpQLSdkgfCt-kErWk9isiQk6Km1e8Q9OhQLXqmb_23esNwLp7Bb-w/viewform?usp=sf_link";

setTimeout(()=>{
if(GFRetries<3)
LNoticeBox({msg:"You should have been redirected to a form by now.",buttons:["Retry","Close"]},e=>{if(e==0)TryGotoForm(GFRetries+1)});
else
LNoticeBox({msg:"You should have been redirected to a form by now.\n\nYou don't seem to be redirected, please open a new tab and paste this URL: https://docs.google.com/forms/d/e/1FAIpQLSdkgfCt-kErWk9isiQk6Km1e8Q9OhQLXqmb_23esNwLp7Bb-w/viewform?usp=sf_link",buttons:["Retry","Close"]},e=>{if(e==0)TryGotoForm(GFRetries)});
},1200);

}
TryGotoForm();

}

});
}
}

if(!cookiesobj["usr"]&&!cookiesobj["pwd"]){
NavItems=NavItems.concat(AnonymousItems);
}
//End check cookies



//Google Analytics
//Script 1-2: VulcanWM's analytics
//Script 3-4: javasuperhot's analytics

var Script1 = document.createElement("script");
Script1.setAttribute("async", null);
Script1.src = 
"https://www.googletagmanager.com/gtag/js?id=UA-176218250-1";
document.head.appendChild(Script1);


var Script2 = document.createElement("script");
Script2.innerText = 
"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','UA-176218250-1');";
document.head.appendChild(Script2);


var Script3 = document.createElement("script");
Script3.setAttribute("async", null);
Script3.src = "https://www.googletagmanager.com/gtag/js?id=UA-176175876-1";
document.head.appendChild(Script3);


var Script4 = document.createElement("script");
Script4.innerText = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','UA-176175876-1');";
document.head.appendChild(Script4);




const Titles={
"/home":"Home",
"/register":"Register",
"/login":"Log in",
"/account":"Account",
"/feedback_sent":"Thank you!",
"/credits":"Credits",
"/search":"Search",
"/new_thread":"New post",
"/rules":"Rules",
"/account/delete":"Delete account",
"/browse_threads":"Browse Posts",
"/account/make_admin":"Make administrator",
"/account/revoke_admin":"Revoke administrator",
"/admacs":"ADMACS",
"/login/lost_password":"Recover password",
"/help":"Customer service",
"/user_directory":"User directory",
"/404":"Page not found"
};

const DiscussionBlackList={
"/home":true,
"/login":true,
"/register":true,
"/account":true,
"/feedback_sent":true,
"/credits":true,
"/404":true
};


const
TitleSuffix=" - BigFatGrub Hub",
UnknownPage="Unknown";

function UpdateTitle(TitleOverride){
var CTitle=Titles[window.location.pathname]||null;
document.title=`${TitleOverride||CTitle||UnknownPage}${TitleSuffix}`;
}
UpdateTitle();

var Stylesheet=document.createElement("link");
Stylesheet.href="/css/stylesh.css";
Stylesheet.rel="stylesheet";
Stylesheet.type="text/css";
document.head.appendChild(Stylesheet);

var FavIcon=document.createElement("link");
FavIcon.href="/icons/favicon_small.png";
FavIcon.rel="shortcut icon";
FavIcon.type="image/png";
document.head.appendChild(FavIcon);

window.addEventListener("click",e=>{
if(e.target.tagName=="PORTAL"&&e.target.hasAttribute("loc")){
window.location.href=e.target.getAttribute("loc");
}});


var PreNav = document.createElement("div");
PreNav.classList.add("prenav");
document.body.appendChild(PreNav);

var PreNavLogo = document.createElement("prenavlogo");
PreNavLogo.addEventListener("click", () => {
window.location.href = "/";
});
PreNav.appendChild(PreNavLogo);

var SearchBar = document.createElement("input");
SearchBar.classList.add("def-input", "searchbar");
SearchBar.placeholder = "Search for games...";
SearchBar.addEventListener("keydown", e => {
if(e.keyCode == 13 && !e.repeat && SearchBar.value)
window.location.href = "/search?" + (SearchBar.value);
});
PreNav.appendChild(SearchBar);

var SearchBtn = document.createElement("button");
SearchBtn.classList.add("searchbtn");
SearchBtn.addEventListener("click", () => {
if(SearchBar.value)
window.location.href = "/search?" + (SearchBar.value);
});
PreNav.appendChild(SearchBtn);


let TNavBar=document.createElement("div");
TNavBar.classList.add("nav");
document.body.appendChild(TNavBar);
var Rightify=document.createElement("right");
TNavBar.appendChild(Rightify);


for(var i=0;i<NavItems.length;i++){
(i=>{
var CBtn=document.createElement("item");

var ItemText=document.createElement("span");
ItemText.innerText=NavItems[i][0];
CBtn.appendChild(ItemText);

if(NavItems[i][1]===null)
CBtn.setAttribute("placeholder","");
else if(typeof NavItems[i][1]==="object"){
CBtn.classList.add("itemnav");

var SelfItemsArr=NavItems[i][1];

var SelfItems=document.createElement("div");
SelfItems.classList.add("navitemmenu");
CBtn.appendChild(SelfItems);


for(var l=0;l<SelfItemsArr.length;l++){
(l=>{
var PropItem=document.createElement("span");
PropItem.innerText=SelfItemsArr[l][0];
PropItem.classList.add("navmenuprop");
PropItem.addEventListener("click",()=>{
window.location.href=SelfItemsArr[l][1];
});
SelfItems.appendChild(PropItem);
})(l);
}


var MenuVisible=false;

function ToggleMenu(){
if(MenuVisible)
HideMenu();
else
ShowMenu();
}
function HideMenu(){
SelfItems.classList.remove("shownavmenu");
CBtn.classList.remove("navmenushown");
MenuVisible=false;
window.removeEventListener("click",GlobalHideMenuListener);
}
function ShowMenu(){
SelfItems.classList.add("shownavmenu");
CBtn.classList.add("navmenushown");
MenuVisible=true;
}

function GlobalHideMenuListener(e){
if(MenuVisible&&e.target!==SelfItems&&e.target.parentElement!==SelfItems&&e.target!==CBtn){
HideMenu();
}}

CBtn.addEventListener("click",()=>{
ToggleMenu();
if(MenuVisible){
window.addEventListener("click",GlobalHideMenuListener);
}
});

}else
CBtn.addEventListener("click",()=>{
window.location.href=NavItems[i][1];
});

if(NavItems[i][2])
Rightify.appendChild(CBtn);
else
TNavBar.appendChild(CBtn);
})(i);
}


function ScrollEvent(){
if((window.innerHeight + window.scrollY) >= document.body.offsetHeight/*- 20*/){
window.onscroll = null;
UpdateComments();
}}

window.onscroll = ScrollEvent;

setTimeout(ScrollEvent, 500);


let CommentsRenderMax=5;
let SelectedDiscSortingMethod=0;

function UpdateComments(){
if(DiscussionBlackList[location.pathname])
return;

return new Promise(r=>{
var http=new XMLHttpRequest();
http.open("POST","/postcomment/getcomments.php",true);
http.onreadystatechange=()=>{
if(http.status==200&&http.readyState==4){
if(http.responseText=="")
return;

var ResultC=new Map(),AllComments=JSON.parse(http.response),ACArr=Object.keys(AllComments);


var DiscDateIdxArray=[];

switch(SelectedDiscSortingMethod){
case 0:
  for(var i=0;i<ACArr.length;i++){
  DiscDateIdxArray.push([AllComments[ACArr[i]].date,ACArr[i]]);
  }
  DiscDateIdxArray.sort();
  DiscDateIdxArray.reverse();
  break;
case 1:
  for(var i=0;i<ACArr.length;i++){
  DiscDateIdxArray.push([AllComments[ACArr[i]].date,ACArr[i]]);
  }
  DiscDateIdxArray.sort();
  break;
case 2:
  for(var i=0;i<ACArr.length;i++){
  DiscDateIdxArray.push([AllComments[ACArr[i]].numvotes||0,ACArr[i]]);
  }
  DiscDateIdxArray.sort();
  DiscDateIdxArray.reverse();
  break;
default:
  EPopup("Unknown sorting method");
  break;
}



for(var i=0;i<DiscDateIdxArray.length;i++){
ACArr[i] = DiscDateIdxArray[i][1];
}

ACArr.splice(CommentsRenderMax);


for(var i=0;i<ACArr.length;i++){
ResultC.set(ACArr[i],AllComments[ACArr[i]]);
}


RenderComments(ResultC,Object.keys(AllComments).length);
r();

}
};
http.send(location.pathname);
});
}




function gpos(src,ss,idx){
return src.split(ss,idx).join(ss).length;
}
function intbtp(num){
return num<10?"0"+num:""+num;
}

function RenderComments(Parsed,AllCommentsLen){
AllCommentsLen=AllCommentsLen||Object.keys(Parsed).length;

if(document.querySelector(".cs-wr"))
document.querySelector(".cs-wr").parentElement.removeChild(document.querySelector(".cs-wr"));

var CWrapper=document.createElement("div");
CWrapper.classList.add("cs-wr");
document.body.appendChild(CWrapper);

var DiscInfo=document.createElement("span");
DiscInfo.innerText="Comments ("+AllCommentsLen+")";
DiscInfo.style.display="block";
DiscInfo.classList.add("lnote");
CWrapper.appendChild(DiscInfo);


var DiscSortingMethods=[
"Newest first",
"Oldest first",
"Most votes"
];


var DiscSortLabel=document.createElement("rtext");
DiscSortLabel.innerText="Sort discussion by:";
CWrapper.appendChild(DiscSortLabel);

var DiscSort=document.createElement("select");

for(var i=0;i<DiscSortingMethods.length;i++){
var CDiscSortMethod=document.createElement("option");
CDiscSortMethod.innerText=DiscSortingMethods[i];

if(i==SelectedDiscSortingMethod)
CDiscSortMethod.selected="selected";

DiscSort.appendChild(CDiscSortMethod);
}

DiscSort.onchange=()=>{

var Spinner=document.createElement("div");
Spinner.classList.add("spinner");
DiscSort.appendChild(Spinner);

SelectedDiscSortingMethod=DiscSort.selectedIndex;
UpdateComments();
};

DiscSort.classList.add("def-button");
CWrapper.appendChild(DiscSort);



var CReload=document.createElement("div");
CReload.addEventListener("click",()=>{
var Dialog=DialogBox({msg:"Loading comments..."});
CReload.classList.add("rotate-inf");
UpdateComments().then(()=>{CReload.classList.remove("rotate-inf");Dialog.close();DialogBox({msg:"Comments loaded.",timeout:1200})});
});
CReload.classList.add("reload-btn");
CWrapper.appendChild(CReload);

var CTop=document.createElement("div");
CTop.addEventListener("click",()=>{
window.scrollTo({top:CWrapper.offsetTop-50,left:0,behavior:"smooth"});
});
CTop.classList.add("gtop-btn");
CWrapper.appendChild(CTop);

var ACWrapper=document.createElement("div");
CWrapper.appendChild(ACWrapper);

for(let [cid,i] of Parsed){
((cid,i)=>{
var CObj=i,
Author=CObj.uname,
AuthorAvatar=CObj.avatar,
Body=CObj.body,
LDate=CObj.date,
Votes=CObj.numvotes,
HasVoted=CObj.hasvoted;


var CComment=document.createElement("div");
CComment.classList.add("single-comment");

if(HasVoted)
CComment.classList.add("votedfor-comment");

ACWrapper.appendChild(CComment);

var AvatarImage=document.createElement("img");
AvatarImage.src=AuthorAvatar;
AvatarImage.classList.add("user-avatar");
AvatarImage.addEventListener("click",()=>{
window.location.href="/user/"+Author;
});
CComment.appendChild(AvatarImage);

var AuthorParag=document.createElement("span");
AuthorParag.innerText=Author;
AuthorParag.classList.add("author-text");
AuthorParag.addEventListener("click",()=>{
window.location.href="/user/"+Author;
});

if(Author==window["FixedUsername"])
AuthorParag.classList.add("own-comment");
if(CObj.ismod)
AuthorParag.classList.add("mod-comment");
if(CObj.isadmin)
AuthorParag.classList.add("adm-comment");
CComment.appendChild(AuthorParag);

var DateParag=document.createElement("span"),
CDate=new Date(parseInt(LDate)),TimeAgo=Date.now()-parseInt(LDate);

var Years_Ago=Math.floor(TimeAgo/1000/60/60/24/365);
var Months_Ago=Math.floor(TimeAgo/1000/60/60/24/30.5);
var Days_Ago=Math.floor(TimeAgo/1000/60/60/24);
var Hours_Ago=Math.floor(TimeAgo/1000/60/60);
var Minutes_Ago=Math.floor(TimeAgo/1000/60);
var Seconds_Ago=Math.floor(TimeAgo/1000);

var TAgoStr="";
if(Seconds_Ago>59){
if(Minutes_Ago>59){
if(Hours_Ago>23){
if(Days_Ago>29){
if(Months_Ago>11){
TAgoStr+=Years_Ago+" year"+(Years_Ago==1?"":"s");
}else
TAgoStr+=Months_Ago+" month"+(Months_Ago==1?"":"s");
}else
TAgoStr+=Days_Ago+" day"+(Days_Ago==1?"":"s");
}else
TAgoStr+=Hours_Ago+" hour"+(Hours_Ago==1?"":"s");
}else
TAgoStr+=Minutes_Ago+" minute"+(Minutes_Ago==1?"":"s");
}else
TAgoStr+=Seconds_Ago+" second"+(Seconds_Ago==1?"":"s");

TAgoStr+=" ago";

DateParag.innerText=`${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][CDate.getDay()]} ${CDate.getDate()} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][CDate.getMonth()]} ${CDate.getFullYear()} ${intbtp(CDate.getHours())}:${intbtp(CDate.getMinutes())} (${TAgoStr})`;
DateParag.classList.add("date-text");
CComment.appendChild(DateParag);


var VotesParag=document.createElement("span");
VotesParag.innerText=`${Votes} vote${Votes!==1?"s":""}`;
VotesParag.classList.add("vote-text");
CComment.appendChild(VotesParag);


var UrlRegex = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})");

var TagRegex = new RegExp("^@([a-zA-Z0-9_]){3,16}$");


var BodyParag=document.createElement("span");
var Shortened=Body.slice(0,300);

var BodyArray = Shortened.split(" ");

function LoadWords(i){
i = i || 0;
var Span = document.createElement("span");
BodyParag.appendChild(Span);
var UrlSpan = document.createElement("span");
BodyParag.appendChild(UrlSpan);

for(var i = i; i < BodyArray.length; i++){
if((UrlRegex.test(BodyArray[i]) || TagRegex.test(BodyArray[i])) && BodyArray[i][BodyArray[i].length - 1].lastIndexOf("\n") !== -1 && i !== BodyArray.length - 1){
var Divide1 = BodyArray[i].substr(0, BodyArray[i].indexOf("\n"));
var Divide2 = BodyArray[i].substr(BodyArray[i].indexOf("\n"));
BodyArray = Divide1;
BodyArray[i + 1] = Divide2 + BodyArray[i + 1];
}


if(UrlRegex.test(BodyArray[i])){
UrlSpan.innerHTML += (i !== 0 ? " " : "") + BodyArray[i].split("<").join("").link(BodyArray[i]);

LoadWords(i + 1);
break;
}else if(TagRegex.test(BodyArray[i])){
UrlSpan.innerHTML += (i !== 0 ? " " : "") + BodyArray[i].split("<").join("").link("/user/" + BodyArray[i].substr(1));

LoadWords(i + 1);
break;
}else
Span.innerText += (i !== 0 ? " " : "") + BodyArray[i];
}}
LoadWords();


BodyParag.classList.add("body-text");
CComment.appendChild(BodyParag);


if(Shortened.length<Body.length){
var Expanded=false;
function Reset(){
var ExpMsg=document.createElement("span");
ExpMsg.innerText=Expanded?"Collapse":"Expand";
ExpMsg.classList.add("sm-text");
ExpMsg.addEventListener("click",()=>{
Expanded=!Expanded;
BodyParag.innerText=Expanded?Body:Shortened;
CComment.removeChild(ExpMsg);
Reset();
});
CComment.appendChild(ExpMsg);
}
Reset();
}




if(window["FixedUsername"]&&FixedUsername!==Author){
var VoteTag=document.createElement("span");
VoteTag.innerText=!HasVoted?"Vote":"Unvote";
VoteTag.classList.add("vote-tag");
VoteTag.addEventListener("click",()=>{

var http=new XMLHttpRequest();
http.open("POST","/cvote",true);
http.onreadystatechange=()=>{
if(http.status==200&&http.readyState==4)
if(http.responseText=="vot")
DialogBox({msg:"Voted comment.",timeout:800});
else if(http.responseText=="unvot")
DialogBox({msg:"Unvoted comment.",timeout:800});

UpdateComments();
};
http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
http.send("source="+location.pathname+"&idx="+cid);
});
CComment.appendChild(VoteTag);
}







if(window["FixedUsername"] && FixedUsername !== Author){
var ReportTag=document.createElement("span");
ReportTag.innerText="Report";
ReportTag.classList.add("report-tag");
ReportTag.addEventListener("click",()=>{
LNoticeBox({msg:"Are you sure that you want to report this comment by "+Author+"?\n\nIf this seems to be a spam account, then please report the account too or instead (you can report users in their profile, you get there by clicking their username).",buttons:["Report",["Cancel"]]},c=>{
if(c!==0)
return;

var http=new XMLHttpRequest();
http.open("POST","/reports",true);
http.onreadystatechange=()=>{
if(http.status==200&&http.readyState==4)
switch(http.responseText){
case "del":
  LNoticeBox({msg:"The comment has been removed, thank you for reporting it!",buttons:[["Close"]]});
  break;
case "r":
  LNoticeBox({msg:"The report has been sent, thank you!",buttons:[["Close"]]});
  break;
case "w":
  LNoticeBox({msg:"This comment was recently reported, it will take a while before a new report can be submitted.",buttons:[["Close"]]});
  break;
case "nli":
  DialogBox({msg:"You must be logged in to report a comment.",timeout:3000});
  break;
case "crm":
  DialogBox({msg:"You cannot report a comment made by a moderator.",timeout:5000});
  break;
}

UpdateComments();
};
http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
http.send("source="+location.pathname+"&idx="+cid);
})});
CComment.appendChild(ReportTag);
}


if((window["FixedUsername"] && FixedUsername == Author) || IsMod){
var DeleteTag=document.createElement("span");
DeleteTag.innerText="Delete";
DeleteTag.classList.add(!IsMod ? "del-tag" : "mod-action-tag");
DeleteTag.addEventListener("click",()=>{
LNoticeBox({msg:"Are you sure that you want to delete this comment? This action cannot be undone.",buttons:["Delete",["Cancel"]]},c=>{
if(c!==0)
return;

var http=new XMLHttpRequest();
http.open("POST","/reports/deleteown.php",true);
http.onreadystatechange=()=>{
if(http.status==200&&http.readyState==4)
switch(http.responseText){
case "del":
  DialogBox({msg:"The comment was removed.",timeout:3000});
  break;
case "nf":
  DialogBox({msg:"The comment that you tried to delete does not exist.",timeout:3000});
  break;
case "nli":
  DialogBox({msg:"You don't seem to be logged in, this may occur when you are inactive. Try to re-login.",timeout:6000});
  break;
case "iu":
  DialogBox({msg:"You cannot delete this comment. Make sure that the comment author is not a moderator and that you can delete it.",timeout:6000});
  break;
default:
  DialogBox({msg:"Unknown response. ("+http.responseText+")",timeout:3000});
}
UpdateComments();
};
http.send(JSON.stringify({
"source": location.pathname,
"idx": cid
}));
})});
CComment.appendChild(DeleteTag);
}



if(window["FixedUsername"] == Author){
var IsEditing = false;

var EditTag = document.createElement("span");
EditTag.innerText = "Edit";
EditTag.classList.add("edit-tag");
EditTag.addEventListener("click", () => {
if(IsEditing)
return;

IsEditing = true;

var EditDiv = document.createElement("div");
EditDiv.style.margin = "25px";
CComment.appendChild(EditDiv);

var EditBody = document.createElement("textarea");
EditBody.classList.add("def-input");
EditBody.style.display = "block";
EditBody.value = Body;
EditDiv.appendChild(EditBody);

var EditBodyConfirm = document.createElement("button");
EditBodyConfirm.classList.add("def-button");
EditBodyConfirm.style.display = "inline-block";
EditBodyConfirm.innerText = "Confirm";
EditBodyConfirm.addEventListener("click", () => {

var Http = new XMLHttpRequest();
Http.open("POST", "/reports/editown.php", true);
Http.onreadystatechange = () => {
if(Http.status == 200 && Http.readyState == 4)
switch(Http.responseText){
case "ed":
  DialogBox({msg: "The comment was edited.", timeout: 3000});
  break;
case "nf":
  DialogBox({msg: "The comment that you tried to edit does not exist.", timeout: 3000});
  break;
case "nli":
  DialogBox({msg: "You don't seem to be logged in, this may occur when you are inactive. Try to re-login.", timeout: 6000});
  break;
case "iu":
  DialogBox({msg: "You cannot edit this comment.", timeout: 6000});
  break;
case "br":
  DialogBox({msg: "Comment must be 8-999 characters.", timeout: 6000});
  break;
default:
  DialogBox({msg: "Unknown response. (" + Http.responseText + ")", timeout: 3000});
}
UpdateComments();
};
Http.send(JSON.stringify({
"source": location.pathname,
"idx": cid,
"newbody": EditBody.value
}));

});

EditDiv.appendChild(EditBodyConfirm);

var EditBodyCancel = document.createElement("button");
EditBodyCancel.classList.add("def-button");
EditBodyCancel.style.display = "inline-block";
EditBodyCancel.innerText = "Cancel";
EditBodyCancel.addEventListener("click", () => {
EditDiv.parentElement.removeChild(EditDiv);
IsEditing = false;
});
EditDiv.appendChild(EditBodyCancel);

});
CComment.appendChild(EditTag);
}

})(cid,i);
}

if(Parsed.size==0){
var EmptyDiscussion=document.createElement("span");
EmptyDiscussion.classList.add("note");
CWrapper.appendChild(EmptyDiscussion);
}else if(AllCommentsLen>Parsed.size){
var ExtendDiscussion=document.createElement("span");
ExtendDiscussion.innerText="Load more...";
ExtendDiscussion.classList.add("action");
ExtendDiscussion.addEventListener("click",()=>{
ExtendDiscussion.innerText="Loading...";
CommentsRenderMax+=10;
UpdateComments();
});
CWrapper.appendChild(ExtendDiscussion);
}


if(window["FixedUsername"]){
var SelfC=document.createElement("div");
SelfC.classList.add("comment-self");
CWrapper.appendChild(SelfC);

var SelfCBox=document.createElement("textarea");
SelfCBox.classList.add("def-input");
SelfCBox.placeholder="New comment (8+ characters)";
SelfC.appendChild(SelfCBox);

var SelfCSub=document.createElement("button");
SelfCSub.classList.add("def-button");
SelfCSub.innerText="Publish";
SelfCSub.addEventListener("click",()=>{

SelfCSub.innerText="Publishing...";

var Spinner=document.createElement("div");
Spinner.classList.add("spinner");
SelfCSub.appendChild(Spinner);

function CreateComment(conf){
var http=new XMLHttpRequest();
http.open("POST","/postcomment",true);
http.onreadystatechange=()=>{
if(http.status==200&&http.readyState==4){
if(http.responseText=="p"){
DialogBox({msg:"Successfully published comment.",timeout:1500});
UpdateComments();
}else if(http.responseText=="f"){
LNoticeBox({msg:"You are about to publish a comment.\nComments are visible for everyone, make sure that your comment does not contain any personal/sensitive information, as well as following the commenting rules.\nYou can delete your comment when it is posted.\nOther users can report your comment, until the report count reaches 5 and deletes your comment.",buttons:["Publish",["Cancel and discard writing"]]},e=>{
if(e==0)
CreateComment(true);
else
UpdateComments();
});
}else{
DialogBox({msg:"Could not submit comment:\n"+http.responseText,buttons:["Close"],timeout:9000});
UpdateComments();
}}};
http.setRequestHeader("Content-type","application/json");
var sendobj={"body":SelfCBox.value,"from":location.pathname};
if(conf)
sendobj.conf=true;
http.send(JSON.stringify(sendobj));
}
CreateComment();

});
SelfC.appendChild(SelfCSub);
}
}


function DialogBox(Obj,Callback){

if(!document.body){
window.addEventListener("load",()=>DialogBox(Obj,Callback));
return;
}

Obj.msg=Obj.msg||"";
Obj.buttons=Obj.buttons||[];
Callback=Callback||(()=>{});

var Ignore=false;

var NotifHolder=document.createElement("div");
NotifHolder.classList.add("notif");
if(Obj.hideonhover)
NotifHolder.addEventListener("mousemove",()=>{
if(!Ignore){
Callback(Infinity);
ClosePopup();
}
});
document.body.appendChild(NotifHolder);
NotifHolder.classList.add("notif-popup");
setTimeout(()=>{
NotifHolder.classList.remove("notif-popup");
},300);

var NotifMsg=document.createElement("span");
NotifMsg.innerText=Obj.msg;
NotifMsg.classList.add("notif-msg");
NotifHolder.appendChild(NotifMsg);

var BtnHolder=document.createElement("div");
BtnHolder.classList.add("notif-btn-holder");
NotifHolder.appendChild(BtnHolder);


for(var i=0;i<Obj.buttons.length;i++){
(i=>{
var CBtn=document.createElement("button");
CBtn.innerText=Obj.buttons[i];
CBtn.classList.add("notif-btn");
CBtn.addEventListener("click",()=>{
if(!Ignore){
Callback(i);
ClosePopup();
}});
BtnHolder.appendChild(CBtn);
if(i==0)
CBtn.focus();
})(i);
}

function ClosePopup(){
if(NotifHolder&&!Ignore){
Ignore=true;
NotifHolder.classList.add("notif-hide");
setTimeout(()=>{
document.body.removeChild(NotifHolder);
},300);
}
}

if(Obj.timeout)
setTimeout(ClosePopup,Obj.timeout);

return {close:ClosePopup};
}




function LNoticeBox(Obj,Callback){

if(!document.body){
window.addEventListener("load",()=>LNoticeBox(Obj,Callback));
return;
}


document.activeElement.blur();

Obj.msg=Obj.msg||"";
Obj.buttons=Obj.buttons||[];
Callback=Callback||(()=>{});

var Ignore=false;


var Dim=document.createElement("div");
Dim.classList.add("dim");
document.body.appendChild(Dim);

var NotifHolder=document.createElement("div");
NotifHolder.classList.add("lnotice");
document.body.appendChild(NotifHolder);

var NotifMsg=document.createElement("span");
NotifMsg.innerText=Obj.msg;
NotifMsg.classList.add("lnotice-msg");
NotifHolder.appendChild(NotifMsg);

var BtnHolder=document.createElement("div");
BtnHolder.classList.add("lnotice-btn-holder");
NotifHolder.appendChild(BtnHolder);


for(var i=0;i<Obj.buttons.length;i++){
(i=>{
var CBtn=document.createElement("button");
CBtn.innerText=typeof Obj.buttons[i]=="object"?Obj.buttons[i][0]:Obj.buttons[i];
CBtn.classList.add("lnotice-btn");
CBtn.addEventListener("click",()=>{
if(!Ignore){
Callback(i);
ClosePopup();
}});
BtnHolder.appendChild(CBtn);
if(typeof Obj.buttons[i]=="object")
CBtn.focus();
})(i);
}

function ClosePopup(){
if(NotifHolder&&!Ignore){
Ignore=true;
document.body.removeChild(NotifHolder);
document.body.removeChild(Dim);
}
}

if(Obj.timeout)
setTimeout(ClosePopup,Obj.timeout);

return {close:ClosePopup};
}





function EPopup(Msg,UseHTML){

if(!document.body){
window.addEventListener("load",()=>EPopup(Msg,UseHTML));
return;
}

var EPE=document.createElement("div");
var Text=document.createElement("span");
if(!UseHTML)
Text.innerText=Msg;
else
Text.innerHTML=Msg;

EPE.appendChild(Text);
var CloseIcon=document.createElement("closeicon");
CloseIcon.addEventListener("click",CloseEP);
EPE.appendChild(CloseIcon);

EPE.classList.add("enotif");
document.body.appendChild(EPE);

function CloseEP(){
if(EPE)
document.body.removeChild(EPE);
}

}




function InitLogOut(){
LNoticeBox({
msg:"Are you sure that you want to log out from your account?\n\nWARNING: Unless you have an e-mail set, you must remember your password to be able to access your account again!",
buttons:["Log out",["Cancel"]]
},e=>{
if(e==0)
window.location.href="/logout";
});
}



function HTMLPreview(){
var PopupBox = document.createElement("div");
PopupBox.classList.add("htmlpreview");
document.body.appendChild(PopupBox);

var PopupBoxClose = document.createElement("span");
PopupBoxClose.classList.add("htmlpreviewcloseicon");
PopupBoxClose.addEventListener("click", ClosePopup);
PopupBox.appendChild(PopupBoxClose);

var PopupInner = document.createElement("div");
PopupBox.appendChild(PopupInner);

var Dim = document.createElement("div");
Dim.classList.add("dim");
document.body.appendChild(Dim);

function ClosePopup(){
PopupBox.parentElement.removeChild(PopupBox);
Dim.parentElement.removeChild(Dim);
}

return PopupInner;
}
function FocusPopup(Msg){
var Popup = HTMLPreview();

var Message = document.createElement("rtext");
Message.innerText = Msg;
Message.classList.add("textcenter");
Popup.appendChild(Message);
}
