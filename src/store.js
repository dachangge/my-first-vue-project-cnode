/**
 * Created by dcg on 2018/4/18.
 */
const LOCALSTROGENAME='todolists';
export default {
  fetch(){
    return JSON.parse(window.localStorage.getItem(LOCALSTROGENAME))||[];
  },
  save(items){
    window.localStorage.setItem(LOCALSTROGENAME,JSON.stringify(items));
  }
}
