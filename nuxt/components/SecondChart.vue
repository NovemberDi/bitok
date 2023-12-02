<template >
  <div  class="chart">
    <apexchart  type='area'  height="350px" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
    name: 'SecondChart',
    props:{
      dataSet:{type:Object},
    },
    data() {
      return { 
            series: [{
              name: 'Улица',
              data: []
            },],
            chartOptions: {
              chart: {
                type: 'area'
              },
              title: {
                text: 'Bitcoin | USD',
                align: 'left',
                margin: 10,
                offsetX: 50,
                offsetY: -10,
                floating: true,
                style: {
                  fontSize:  '18px',
                  fontWeight:  'bold',
                  fontFamily:  'Jura',
                  color:  '#fffde0'
                },
            },
              dataLabels: {
              enabled: false,
              formatter: function (val) {
                return   val.toFixed()+' мм';
              },        
            },              
              colors:['#25ff53'],
              stroke: {
                curve: 'smooth'
              },
              legend: {
                labels: {
                    // colors: '#fffde0',
                    useSeriesColors: true
                },
              },
              yaxis:{

                labels: {
                  
                  formatter: (value) => { return  value?value.toFixed(0):value},

                  style: {
                      colors: '#fffde0',
                  },
                },
              },
              xaxis: {
                type: 'datetime',
                categories: [new Date().toISOString()], // или просто Date.now() :)
                // tickPlacement: 'on',
                labels: {
                  datetimeUTC: false, // системный часовой пояс
                  style: {
                      colors: '#fffde0',
                  },
                  
                },
              
                
              },
              tooltip: {
                x: {
                  format: 'dd.MM.yyyy HH:mm'
                }
              },
              noData: {
                text: 'Нет данных..',
              },
              chart: {
                toolbar: {
                  show: true,
                  tools: {
                    zoomin: false, 
                    zoomout: false,    
                  }
                },
                animations: {
                  enabled: false,
                  easing: 'easeinout',
                  speed: 800,
                  animateGradually: {
                      enabled: false,
                      delay: 150
                  },
                  dynamicAnimation: {
                      enabled: true,
                      speed: 350
                  }
                },
                locales: [{
                  "name": "ru",
                  "options": {
                    "months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    "shortMonths": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                    "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                  }
                }],
                defaultLocale: "ru"
              }
            },
               
      }
    },
    methods:{
    },
    watch:{
          dataSet(newValue){   
            this.chartOptions = { xaxis: { categories: newValue.categories}};
                this.series = newValue.series;
          }
      },
}
</script>

<style scoped>
.chart{
backdrop-filter: blur(2px);
padding-top:50px;
width: 100%;
color: #333333;
}
</style>