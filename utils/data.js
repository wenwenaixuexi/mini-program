var landscapeList = [
  {
    landscapeCode: 1,
    landscapeName: '兵马俑一日游',
    landscapeJoin:"2人团*已团230人",
    landscapePrice: 230,
    landscapePic: 'https://tqimg.idongde.com/d/2020/01/10/1578630059796869.jpg',
    landscapeDec: '一日游：钟楼，永兴坊，大雁塔，大唐不夜城散团。各种纪念品任你挑选！开启你的云端旅行吧！',
    landscapeRoute:'../../images/route.png',
    landscapezhibo:'http://www.travel1.com'
  },
  {
    landscapeCode: 2,
    landscapeName: '法门寺一日游',
    landscapeJoin:"2人团*已团150人",
    landscapePrice: 300,
    landscapePic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2033098625,3551829079&fm=26&gp=0.jpg',
    landscapeDec: '一日游：懿德太子墓，乾陵，法门寺。各种纪念品任你挑选！开启你的云端旅行吧！',
    landscapeRoute:'../../images/route2.png',
    landscapezhibo:'http://www.travel2.com'
  },
]
function getlandscapeList(){
  return landscapeList;
}
//通过索引在缓存中找到
function getlandscapeListByIndex(indexList){
  var landscapeNewList=[];
 
  for(let i=0;i<indexList.length;i++){
    var index = indexList[i].index;
    var landscape=landscapeList[index];
    landscapeNewList.push(landscape);
  }
  return landscapeNewList;
}

module.exports = {
  getlandscapeList: getlandscapeList,
  getlandscapeListByIndex: getlandscapeListByIndex
}
