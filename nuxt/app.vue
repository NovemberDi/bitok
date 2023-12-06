<template> 
<div class="texture"></div> 
 <div class="page-wrap">
    <header>
      <div class="title"> BitOk </div>
      <div class="description">просто курс биткоина</div>
    </header>
    <HistoryCharts>
    </HistoryCharts>
    
  </div>   
</template>
<script>
export default{
  data(){
    return {
     
    
    }
  }
}
</script>
<style>

body, html{
  margin:0;
  padding: 0;
  background-color: rgb(66, 67, 66);
}
#__nuxt{
  min-height: 100vh;
  /* height: 100vh; */
  margin: 0;
  padding: 0;
  font-family: 'jura', arial;
  position: relative;
}
header{
  color: #fffde0;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 10px;
  padding-left: 30px;
}
.title{
  font-size: 32px;
}
.description{
  margin-left: 20px;
  font-size: 14px;
  font-weight: 100;
}
.texture {
  height:100%;
  width: 100%;
  position:absolute;
  z-index: 0;
  --dot-bg: rgb(38, 43, 48);
  --dot-color: rgba(121, 121, 121, 0.661);
  --dot-size: 2px;
  --dot-space: 38px;
	background:
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		var(--dot-color);   
}
.page-wrap{
  /* height: 100vh; */
}
</style>
