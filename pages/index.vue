<template lang="pug">
  section.container
    .line-window
      .head 金水
        .options(v-if="isopen_option")
      .chat-content
        Chat_bubble(ref="childTest")
      .input-content
        .stickers_wraper(v-if="isopen_sticker")
          .slider
            section.slide(v-for="s in 10")
              .sticker(v-for="n in 4" v-on:click="send_img((s-1)*4 + n)" v-bind:style="{ 'background-image': 'url(/sticker/' + ((s-1)*4 + n) + '.png)' }")
          .dots
            .dot(v-for="n in 10" v-on:click="stick_slide(n)")
            //- .stick(v-for="stick in stickers") {{stick}}
        .state_controller
          .state_icon.state_hover(style="background-image: url('/dog-face.png')" v-on:click="speak(true)")
          .state_icon.state_hover(style="background-image: url('/cat-face.png')" v-on:click="speak(false)")
          .gap
          .state_icon(style="background-image: url('/tab.png')" v-on:click="open_sticker")
        .inp
 
          input.inputclass(v-model="text" :placeholder = "placeholder")
          input.send(type="submit" value="SEND" v-on:click="send_text")

</template>

<script>
import Logo from '~/components/Logo.vue'
import Chat_bubble from '~/components/Chat_bubble.vue'

export default {
  components: {
    Logo,
    Chat_bubble
  },
  data() {
    return {
      text: "",
      isopen_option: false,
      isopen_sticker: false,
      isdog_speak: false,
      placeholder: "現在是我在說話!!",
      stickers: [0,0,0,0,0,0]
    }
  },
  mounted() {
    this.$el.querySelectorAll(".state_icon")[1].style.filter = "grayscale(0%)"
    this.setPage_scroll()
  },
  methods: {
    stick_slide: function(n){
      let slider = this.$el.querySelector(".slider")
      let scrollto = slider.offsetWidth*(n-1) + "px"
      slider.style.transform = `translateX(-${scrollto})`
    },
    setPage_scroll: function(){

    },
    speak: function(isdog_speak){
      let item = this.$el.querySelectorAll(".state_icon")
      if(isdog_speak){
        this.placeholder = "現在是金水在說話!!"
        this.isdog_speak = isdog_speak
        item[0].style.filter = "grayscale(0%)"
        item[0].classList.add("wobble-hor-bottom")
        item[1].style.filter = "grayscale(100%)"
        item[1].classList.remove("wobble-hor-bottom")
        this.isdog_speak = isdog_speak
      } else {
        this.placeholder = "現在是我在說話!!"
        this.isdog_speak = isdog_speak
        item[1].style.filter = "grayscale(0%)"
        item[1].classList.add("wobble-hor-bottom")
        item[0].classList.remove("wobble-hor-bottom")
        item[0].style.filter = "grayscale(100%)"
        this.isdog_speak = isdog_speak
      }
    },
    scroll_down: function(){
      let container = this.$el.querySelector(".chat-content")
      container.scrollTop = container.scrollHeight
    },
    send_text: function(event){
      let message = this.$refs.childTest
      message.add(!this.isdog_speak, this.text, false)
      this.text = ""
      this.scroll_down()
      return false
    },
    send_img: function(png) {
      let message = this.$refs.childTest
      message.add(!this.isdog_speak, "", true, png)
      this.scroll_down()

    },
    open_sticker: function(){
      this.isopen_sticker = !this.isopen_sticker
      let gridupdate = this.$el.querySelector(".line-window")
      if(this.isopen_sticker){
        gridupdate.style.gridTemplateRows = "70px auto 320px"
        this.$el.querySelectorAll(".state_icon")[2].style.filter = "grayscale(0%)"
      } else {
        gridupdate.style.gridTemplateRows = "70px auto 170px"
        this.$el.querySelectorAll(".state_icon")[2].style.filter = "grayscale(100%)"
      }
      this.scroll_down()

    }
  }
}
</script>

<style lang="sass">

$light-blue: #6FA1C7
$dark-blue: #263147


.container
  margin: 0 auto
  height: 100vh
  width: 100vw
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.line-window
  border-radius: 5px
  height: 850px
  background-color: $light-blue
  display: grid
  grid-template-columns: 450px
  grid-template-rows: 70px auto 170px
  overflow: hidden
  box-shadow: 0 0 1px 4px #263147;  // box-shadow: 15px 15px 25px rgba(#263147, .5)


.head
  width: 100%
  background-color: $dark-blue
  line-height: 70px
  color: white
  font-size: 1.5rem
  font-weight: bold
  z-index: 100
  text-align: center
  vertical-align: middle
  .options
    width: 100%
    height: 100px
    background-color: $dark-blue
    border-top: 2px solid #1b2333




.chat-content
  overflow-y: scroll
  overflow-x: hidden
  width: 100%

  &::-webkit-scrollbar
    width: 8px
    background-color: none
  &::-webkit-scrollbar-thumb
    border-radius: 3px
    background-color: rgba(#2c2c2c, .5)

// #style-4::-webkit-scrollbar
// {
// 	width: 10px;
// 	background-color: #F5F5F5;
// }

// #style-4::-webkit-scrollbar-thumb
// {
// 	background-color: #000000;
// 	border: 2px solid #555555;
// }


.input-content
  width: 100%
  transition: 2s
  height: 170px
  .state_controller
    height: 70px
    background-color: white
    display: flex
    align-items: center
    .state_icon
      filter: grayscale(100%)
      margin-left: 20px
      cursor: pointer
      background-position: center center
      background-size: contain
      background-repeat: no-repeat
      width: 40px
      height: 50px
      transition: .4s
 
    .state_hover
      &:hover
        filter: grayscale(0%)
        transform: scale(1.8)
    
    .gap
      margin-left: 20px
      width: 3px
      border-radius: 5px
      height: 80%
      background-color: darkgray


  .inp
    height: 100px
    background-color: lightgrey
    width: 100%
    display: flex
    justify-items: center
    align-items: center
    .inputclass
      padding-left: 20px
      border-style: none
      border-radius: 5px
      margin-left: 15px
      height: 60%
      width: 70%
      font-size: 1.2rem
    .send
      border: none
      border-radius: 5px
      color: white
      font-size: 1.2rem
      font-weight: bold
      line-height: 55px
      margin-left: 15px
      height: 60%
      width: 20%
      background-color: $light-blue
      cursor: pointer
        
.stickers_wraper
  height: 150px
  width: 100%
  background-color: white
  border-bottom: 1.5px solid lightgray
  display: flex
  position: relative
  .slider
    height: 100%
    width: 100%
    display: flex
    transition: .3s
    // &::-webkit-scrollbar
    //   width: 0 !important

    .slide
      height: 100%
      min-width: 100%
      display: flex
      .sticker
        width: 25%
        background-image: url("/dog.png")
        background-position: center center
        background-size: contain
        background-repeat: no-repeat
        margin-bottom: 10px
        margin-right: 10px


  
  .dots
    position: absolute
    display: flex
    left: 50%
    bottom: 0%
    transform: translate(-50%, -50%)
    .dot
      cursor: pointer
      margin: 3px
      width: 10px
      height: 10px
      background-color: lightgray
      border-radius: 5px








// asdas
.wobble-hor-bottom
  -webkit-animation: wobble-hor-bottom .8s 1
  animation: wobble-hor-bottom .8s 1

// @-webkit-keyframes wobble-hor-bottom
//   0%,100%
//     -webkit-transform: translateY(0)
//     transform: translateY(0)
//     -webkit-transform-origin: 50% 50%
//     transform-origin: 50% 50%

//   15%
//     -webkit-transform: translateY(-30px) rotate(-6deg)
//     transform: translateY(-30px) rotate(-6deg)

//   30%
//     -webkit-transform: translateY(15px) rotate(6deg)
//     transform: translateY(15px) rotate(6deg)

//   45%
//     -webkit-transform: translateY(-15px) rotate(-3.6deg)
//     transform: translateY(-15px) rotate(-3.6deg)

//   60%
//     -webkit-transform: translateY(9px) rotate(2.4deg)
//     transform: translateY(9px) rotate(2.4deg)

//   75%
//     -webkit-transform: translateY(-6px) rotate(-1.2deg)
//     transform: translateY(-6px) rotate(-1.2deg)


@keyframes wobble-hor-bottom
  0%,100%
    -webkit-transform: translateY(0)
    transform: translateY(0)
    -webkit-transform-origin: 50% 50%
    transform-origin: 50% 50%
    transform: scale(1.8)

  15%
    -webkit-transform: translateY(-30px) rotate(-6deg)
    transform: translateY(-30px) rotate(-6deg)

  30%
    -webkit-transform: translateY(15px) rotate(6deg)
    transform: translateY(15px) rotate(6deg)

  45%
    -webkit-transform: translateY(-15px) rotate(-3.6deg)
    transform: translateY(-15px) rotate(-3.6deg)

  60%
    -webkit-transform: translateY(9px) rotate(2.4deg)
    transform: translateY(9px) rotate(2.4deg)

  75%
    -webkit-transform: translateY(-6px) rotate(-1.2deg)
    transform: translateY(-6px) rotate(-1.2deg)
    


.v-leave
  opacity: 1
.v-leave-active
  transition: opacity .5s

.v-leave-to
  opacity: 0
.v-enter
  opacity: 0
.v-enter-active
  transition: opacity .2s
.v-enter-to
  opacity: 1


@media screen and (max-width: 600px)

  .container
    overflow: scroll
    align-items: flex-start


  .line-window
      height: 100vh
      margin: 10px
      grid-template-columns: 95vw
      grid-template-rows: 50px auto 170px

  .head
    line-height: 50px

  .send
    border-radius: 0px
    font-size: 1rem !important

  input
    -webkit-appearance: none

</style>
