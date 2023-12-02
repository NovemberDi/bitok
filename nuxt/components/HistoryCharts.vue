<template>
   <div class="historyChartsWrap" onselectstart="return false">
      <div class="topBar" >
        <div class="day intervalButton" :class="{current: selector.day}"   @click="setSelector('day')">Сутки</div>
        <div class="week intervalButton" :class="{current: selector.week}"  @click="setSelector('week')" >Неделя</div>
        <div class="month intervalButton" :class="{current: selector.month}"  @click="setSelector('month')" >Месяц</div>
        <div class="year intervalButton" :class="{current: selector.year}"  @click="setSelector('year')" >Год</div>        
      </div>
      <div class="bottomBar">
        <UILeftButton @click="moveLeft"></UILeftButton>
        <div class="inputWrap">
          <input class="input" :class="{currentInput: selector.interval}" type="date" v-model="startInput" @input="updateStart" @click="setSelector('interval')">
        </div>
        <div class="inputWrap">
          <input class="input" :class="{currentInput: selector.interval}" type="date" v-model="endInput" @input="updateEnd" @click="setSelector('interval')">
        </div>
        <UIRightButton @click="moveRight" ></UIRightButton>
      </div>
      <SecondChart :dataSet="dataSet"></SecondChart>
  </div>
</template>


<script>
  export default {
    data(){
      return {
        queryResult: {},
        selector:{
             day: true,
             week: false,
             month: false,
             year: false,
             interval: false,
        },
        startInput:'',
        endInput:'',
        startTime:  '',
        endTime: '',
        rangeOfDays: 1,
        dataSet: {},

      }},
      methods:{
          updateStart(event){
            this.startTime = Date.parse(event.target.value);
            this.getData();

          },
          updateEnd(event){
            this.endTime = Date.parse(event.target.value)+24*3600*1000;
            this.getData();
          },


          async getData(){
            let data = await this.$api.get(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${this.startTime}&end=${this.endTime}`,{

            });
           this.queryResult = data.data.data;
          //  console.log(this.queryResult)
          },


          setSelector(val){
            for (let key in this.selector) {
              this.selector[key] = false;
            };
            this.selector[val] = true;
            if (!this.selector.interval){
            this.setNewDate();
            this.getData()
            }
          },
          setNewDate(){
            if (this.selector.day) this.rangeOfDays = 1;
            if (this.selector.week) this.rangeOfDays = 7;
            if (this.selector.month) this.rangeOfDays = 31;
            if (this.selector.year) this.rangeOfDays = 366;
            this.startTime =  new Date().setHours(new Date().getHours()-24*this.rangeOfDays);
            this.endTime = Date.now();            
          },
          moveLeft(){
            this.startTime -= 24*3600*1000*this.rangeOfDays;
            this.endTime -= 24*3600*1000*this.rangeOfDays;
            this.getData();
          },
          moveRight(){
            this.startTime += 24*3600*1000*this.rangeOfDays;
            this.endTime += 24*3600*1000*this.rangeOfDays;
            this.getData();
          },
          makeDataSet(newValue){
            if (newValue.length>0){
            console.log(newValue.length)
              // let press = newValue.filter((item, index, arr) => {if ((index+1) % splitter == 0) return true})


              
              this.dataSet = {
                series: [{name:'USD', data:[...newValue.map((item) => -(-item.priceUsd))]}],
                categories: newValue.map((item) => item.time)
              } 
              
              
            }
          }
      },

      watch:{
        queryResult(newValue){
          setTimeout(() => {
            this.makeDataSet(newValue)
          },200)
        },
        startTime(newValue){
          this.startInput = new Date(newValue).toISOString().slice(0, 10);
        },
        endTime(newValue){
          this.endInput = new Date(newValue).toISOString().slice(0, 10);
        }
  
      },
      mounted(){
        this.setNewDate();
        this.getData();   
      }
  }
     
</script>

<style scoped>
.topBar{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
}
.bottomBar{
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: #fffde0 1px solid ; */
}
.intervalButton{
  width: 25%;
  height: 25px;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transition: 0.1s ease; */
  opacity: 0.4;
}
.intervalButton:hover{
  opacity: 0.8;
}
.current{
  opacity: 1;
  font-size: 20px;
  font-weight: 600;
}
.intervalButton::after{
  content: "";
  position: absolute;
  display: block;
  bottom: -5px;
  left: 0;
  transform: translate(-50%, 0);
  height: 100%;
  width: 100%;
  /* border-bottom: #fffde0 solid 2px;
  border-right: #fffde0 solid 2px; */
  transform: skewX(-30deg);
  box-shadow: 7px 7px 5px 1px #11111186;  
}
.input{
background:none;
color: #fffde0;
border: none;
margin: 5px;
opacity: 0.4;
width: fit-content;
z-index: 10;
position: relative;

}
.inputWrap{
padding-right: 10px;
height: 24px;
z-index: 0;
position: relative;
display: flex;
align-items: center;
}
.input:hover{
  opacity: 0.8;
}
.currentInput{
  opacity: 1;
}
.inputWrap::after{
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  transform: skewX(-30deg);
  box-shadow: 7px 7px 5px 1px #11111186;
  z-index: 0;
}
.input::-webkit-calendar-picker-indicator { 
  -webkit-filter: invert(80%);
  filter: invert(80%) sepia(100%);

    width: 20px;
    height: 20px;
}
.historyChartsWrap{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  color: #fffde0;
  -webkit-tap-highlight-color: transparent;
  padding: 20px 0 100px 0;
}
</style>