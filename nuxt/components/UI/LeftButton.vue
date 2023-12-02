<template>
    <div class="LeftBtnWrap">
      <svg class="LeftBtn" viewBox="0 0 34 50">
  <defs>

  </defs>
  
  <polygon class="cls-1" points="34 50 0 25 34 0 22 25 34 50"/>
</svg>
    </div>
</template>

<script>
    export default {
        name:'LeftButton',
        // props:{
        //     nightMode:{type: Boolean},
        // }

    }
</script>

<style scoped>
.nightBtn{
  fill: rgba(33, 52, 41, 0.696);
}
.dayBtn{
  fill: rgba(132, 129, 121, 0.321);
  filter: drop-shadow(0px 5px 5px rgb(34, 32, 43));
}
.LeftBtnWrap{
height:50px;
width: 70px;
/* transform: translate(-50%,0); */
display: flex;
justify-content: center;
align-items: center;

}
.LeftBtn{
  fill: rgba(132, 129, 121, 0.321);
  height: 35px;
  width: 35px;
  transition: 40ms linear;
  z-index: 99;
}
.LeftBtn:active{
  height: 45px;
  width: 45px;
}
</style>