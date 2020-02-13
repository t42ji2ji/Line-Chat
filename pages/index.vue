<template lang="pug">
  section.container
    .line-window
      .head(v-on:click="open_options") 金水
        .download
        transition
          .options(v-show="isopen_option")
            .down_btn.op_item(v-on:click="snapshot")
              img(src="/down.png")
              span 截圖
            //- .op_item(@click="upload_story")
            //-   img.up_btn(src="/down.png")
            //-   span 上傳對話
            .op_item(@click="load_story")
              img(src="/random.png")
              span 隨機範例
            .op_item(@click="clean")
              img(src="/clean.png")
              span 清除
      .chat-content
        .wrapper(v-on:scroll="watch")
          Chat_bubble(ref="childTest")
      .input-content
        transition(name="scale")
          .stickers_wraper(v-show="isopen_sticker" )
            .slider
              section.slide(v-for="s in 11")
                .sticker(v-for="n in 4" v-on:click="send_img((s-1)*4 + n)" v-bind:style="{ 'background-image': 'url(/sticker/' + ((s-1)*4 + n) + '.png)' }")
            .dots(key="dot")
              .dot(v-for="n in 11" v-on:click="stick_slide(n)" v-bind:id="'dot_' + n")
              //- .stick(v-for="stick in stickers") {{stick}}
        .state_controller
          .state_icon.state_hover(style="background-image: url('/dog-face.png')" v-on:click="speak(true)")
          .state_icon.state_hover(style="background-image: url('/cat-face.png')" v-on:click="speak(false)")
          .gap
          .state_icon(style="background-image: url('/tab.png')" v-on:click="open_sticker")
          .arrow_wrapper
            i.arrow.left(v-on:click="stick_slide_btn(false)")
            i.arrow.right(v-on:click="stick_slide_btn(true)")
          a.state_icon(style="background-image: url('/line.png'); filter: grayscale(0); margin-left:auto;margin-right:20px;" v-on:click="open_sticker" target="_blank" href="https://store.line.me/stickershop/product/7662172/zh-Hant")

        .inp
          input.inputclass(v-model="text" :placeholder = "placeholder")
          input.send(type="submit" value="SEND" v-on:click="send_text")
    .hh
    .show_window(v-show="isshow_window" v-on:click="()=>{ this.isshow_window = !this.isshow_window}")
      //- .load loading
      img.screenshot
    //- .testbtn(v-on:click="test") asdasdasd
      

</template>

<script>
import Logo from "~/components/Logo.vue";
import Chat_bubble from "~/components/Chat_bubble.vue";
// import axios from "~/plugins/axios";
import * as axios from "axios";

export default {
  components: {
    Logo,
    Chat_bubble
  },
  data() {
    return {
      text: "",
      isshow_window: false,
      isopen_option: false,
      isopen_sticker: false,
      isdog_speak: false,
      placeholder: "現在是我在說話!!",
      last_dot: null,
      now_slide: 1,
      scroll_var: [0, 0, 0], //nowscroll, scrollheight, lasttimescroll
      isScrolling: null,
      isuser_scroll: false,
      ismobile: false,
      story: [],
      message: null,
      ip: ""
    };
  },
  computed: {
    slide_to() {
      var now = 1;
      if (this.now_slide > 11) {
        this.now_slide = 1;
        now = 1;
      } else if (this.now_slide < 1) {
        this.now_slide = 11;
        now = 11;
      } else now = this.now_slide;
      return now;
    }
    // sticker_h() {
    //   if(this.isopen_sticker){
    //     return  "150px"
    //   } else {
    //     return 0
    //   }
    // }
  },
  mounted() {
    this.getip();
    this.$el.querySelectorAll(".state_icon")[1].style.filter = "grayscale(0%)";
    let dot = this.$el.querySelector(".dot");
    dot.style.backgroundColor = "#263147";
    this.last_dot = dot;
    this.ismobile = this.mobile_detec();
    this.keylistener();
    this.message = this.$refs.childTest;
    this.story.push([false, "hey", false, ""]);
  },
  methods: {
    getip: async function() {
      await axios.get("https://api.ipify.org").then(response => {
        this.ip = response.data;
      });
    },
    mobile_detec: function() {
      var check = false;
      (function(a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    beforeEnter: function(n) {
      if ((n = "before-enter")) {
        // gridupdate.style.gridTemplateRows = "70px auto 170px";
      }
    },
    clean: function() {
      this.message.clean();
      this.story = [];
    },
    open_options: function() {
      this.isopen_option = !this.isopen_option;
      let nav = this.$el.querySelector(".download");
      if (this.isopen_option) {
        nav.style.transform = "rotate(180deg)";
        console.log("open");
      } else {
        nav.style.transform = "rotate(0deg)";
        console.log("close");
      }
    },
    keylistener: function() {
      document.addEventListener("keydown", event => {
        if (event.keyCode == 37 && this.isopen_sticker) {
          this.stick_slide_btn(false);
        } else if (event.keyCode == 39 && this.isopen_sticker) {
          this.stick_slide_btn(true);
        } else if (event.keyCode == 13) {
          // this.send_text();
        }
      });
    },
    watch: function(event) {
      var vm = this;
      this.scroll_var[0] = event.target.scrollTop;
      this.scroll_var[1] = event.target.scrollHeight;
      // console.log(event.target.scrollTop, event.target.scrollHeight,this.scroll_var[2]);
      window.clearTimeout(this.isScrolling);
      // this.isScrolling = setTimeout(function() {
      //   // Run the callback
      //   var scroll_dis = Math.abs(vm.scroll_var[2] - vm.scroll_var[0]);
      //   console.log(vm.isuser_scroll);
      //   if (scroll_dis > 120 && vm.isuser_scroll) {
      //     vm.close_all_panle()
      //   }
      //   console.log("Scrolling has stopped.");
      //   vm.isuser_scroll = true
      //   vm.scroll_var[2] = vm.scroll_var[0];
      // }, 150);

      // var st = this.scroll_var[0];
      // if (st > this.scroll_var[2]) {
      //   // downscroll code
      //   console.log("down");
      // } else {
      //   // upscroll code
      //   console.log("up");
      // }
      // this.scroll_var[2] = this.scroll_var[0]
    },
    test: function() {},
    close_all_panle: function() {
      if (this.isopen_sticker) {
        this.open_sticker();
      }
      if (this.isopen_option) {
        this.open_options();
      }
    },
    snapshot: function(e) {
      if (e) {
        e.stopPropagation();
        console.log("in");
      }
      this.close_all_panle();

      let container = this.$el.querySelector(".wrapper");
      container.style.overflowY = "hidden";
      let screnshot = this.$el.querySelector(".screenshot");
      this.isshow_window = !this.isshow_window;
      let node = this.$el.querySelector(".line-window");
      let input = this.$el.querySelector(".inputclass");
      input.setAttribute("placeholder", "");
      screnshot.src = "/LOADING.png";
      setTimeout(() => {
        domtoimage
          .toPng(node, { scrollFix: true })
          .then(function(dataUrl) {
            console.info("png");

            screnshot.src = dataUrl;
            container.style.overflowY = "scroll";
          })
          .catch(function(error) {
            console.error("oops, something went wrong!", error);
          });
      }, 300);
    },
    stick_slide: function(n) {
      this.now_slide = n;
      let slider = this.$el.querySelector(".slider");
      let scrollto = slider.offsetWidth * (this.slide_to - 1) + "px";
      slider.style.transform = `translateX(-${scrollto})`;

      if (this.last_dot) {
        this.last_dot.style.backgroundColor = "lightgray";
      }
      let dot = this.$el.querySelector(`#dot_${this.slide_to}`);
      dot.style.backgroundColor = "#263147";
      this.last_dot = dot;
    },
    stick_slide_btn: function(is_next) {
      if (is_next) {
        this.now_slide += 1;
        this.stick_slide(this.now_slide);
      } else {
        this.now_slide -= 1;
        this.stick_slide(this.now_slide);
      }
    },
    speak: function(isdog_speak) {
      let item = this.$el.querySelectorAll(".state_icon");
      if (isdog_speak) {
        this.placeholder = "現在是金水在說話!!";
        this.isdog_speak = isdog_speak;
        item[0].style.filter = "grayscale(0%)";
        item[0].classList.add("wobble-hor-bottom");
        item[1].style.filter = "grayscale(100%)";
        item[1].classList.remove("wobble-hor-bottom");
        this.isdog_speak = isdog_speak;
      } else {
        this.placeholder = "現在是我在說話!!";
        this.isdog_speak = isdog_speak;
        item[1].style.filter = "grayscale(0%)";
        item[1].classList.add("wobble-hor-bottom");
        item[0].classList.remove("wobble-hor-bottom");
        item[0].style.filter = "grayscale(100%)";
        this.isdog_speak = isdog_speak;
      }
    },
    scroll_down: function() {
      let container = this.$el.querySelector(".wrapper");
      container.scrollTop = container.scrollHeight;
    },
    send_text: function(skipStory = false) {
      this.message.add(!this.isdog_speak, this.text, false);
      if (!skipStory) this.push_story(!this.isdog_speak, this.text, false, "");
      this.text = "";
      this.scroll_down();
    },
    send_img: function(png) {
      let vm = this;
      this.message.add(!this.isdog_speak, "", true, png);
      this.push_story(!this.isdog_speak, "", true, png);
      // setTimeout(function() {
      //   vm.scroll_down();
      // }, 100);
      this.isuser_scroll = false;
      this.scroll_down();
    },
    push_story: function(isdog, text, isimg, pg) {
      this.story.push([isdog, text, isimg, pg]);
    },
    upload_story: function() {
      let vm = this;
      this.scroll_down();
      this.text = "上傳中...";
      this.send_text(true);
      let vt = new Date(Date.now());
      const st = {
        message: [this.story],
        time: vt,
        ip: this.ip
      };
      let posturl = `http://${process.env.HOST || "localhost"}:${process.env
        .PORT || 3000}`;
      axios.post(posturl + "/api/insert_post", st).then(function(response) {
        vm.text = "上傳成功";
        console.log(response);
        vm.send_text(true);
        vm.story = [];
      });
    },
    load_story: function() {
      var vm = this;
      let posturl = `http://${process.env.HOST || "localhost"}:${process.env
        .PORT || 3000}`;
      this.clean();
      this.text = "搜尋中．．．．";
      this.send_text();
      axios.get(posturl + "/api/get_stories").then(function(response) {
        // console.log(response.data);
        vm.clean();
        story_mapping(response.data[0].message[0]);
      });

      function story_mapping(storys) {
        storys.forEach(function(item) {
          if (item[2]) {
            vm.message.add(item[0], item[1], item[2], item[3]);
          } else {
            vm.message.add(item[0], item[1], item[2], item[3]);
          }
        });
      }
    },
    open_sticker: function() {
      this.isopen_sticker = !this.isopen_sticker;
      let gridupdate = this.$el.querySelector(".line-window");
      let arrow = this.$el.querySelector(".arrow_wrapper");

      if (this.isopen_sticker) {
        if (!this.ismobile)
          gridupdate.style.gridTemplateRows = "70px auto 270px";
        this.$el.querySelectorAll(".state_icon")[2].style.filter =
          "grayscale(0%)";
        arrow.style.opacity = 1;
        arrow.style.transform = "translateY(0px)";
      } else {
        if (!this.ismobile)
          gridupdate.style.gridTemplateRows = "70px auto 170px";
        this.$el.querySelectorAll(".state_icon")[2].style.filter =
          "grayscale(100%)";
        arrow.style.opacity = 0;
        arrow.style.transform = "translateY(15px)";
        arrow.classList.remove("arrow_wrapper_effect");
      }
    }
  }
};
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
  flex-direction: column

.line-window
  position: relative
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
  position: relative
  .options
    width: 100%
    height: 100px
    background-color: $dark-blue
    border-top: 2px solid #1b2333
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    

    .op_item
      flex: 1
      height: 80%
      margin: 5px
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      cursor: pointer
      .up_btn
        transform: rotate(180deg)
      span
        margin-top: -5px
        height: 50%
        font-size: 1rem
        pointer-events: none
      img
        pointer-events: none


.chat-content
  width: 100%
  height: auto
  overflow: hidden
  display: flex
  flex-direction: column
  position: relative
  .wrapper
    height: 100%
    position: absolute
    overflow-y: scroll
    overflow-x: hidden
    width: 100%
    -webkit-overflow-scrolling: touch
    transition: .2s
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
  align-self: end
  .state_controller
    height: 70px
    background-color: white
    display: flex
    align-items: center
    position: relative
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
        transform: scale(1.4)
    
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
    position: relative
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
      background-color: $dark-blue
      cursor: pointer
        
.stickers_wraper
  height: 150px
  width: 100%
  background-color: white
  border-bottom: 1.5px solid lightgray
  display: flex
  flex-direction: column
  position: relative
  // transform: translateY(150px)
  .slider
    height: 100%
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
        margin: 6px


  
  .dots
    display: flex
    justify-content: center
    .dot
      cursor: pointer
      margin: 3px
      width: 10px
      height: 10px
      background-color: lightgray
      border-radius: 5px

.show_window
  width: 100vw
  height: 100vh
  background-color: rgba(black, .7)
  position: absolute
  z-index: 999
  display: flex
  justify-content: center
  align-items: center

  .load
    color: white
    position: absolute
    font-size: 3rem


.download
  position: absolute
  right: 15px
  top: 45%
  width: 2rem
  height: 4px
  background-color: white
  border-radius: 5px
  transition: .3s
  &:before, &:after
    content: ""
    position: absolute
    width: 2rem
    height: 4px
    background-color: white
    left: 0
    border-radius: 5px
  &:before
      top: 10px
  &:after
      top: -10px






// asdas
.wobble-hor-bottom
  transform: scale(1.4)
  -webkit-animation: wobble-hor-bottom .8s 1
  animation: wobble-hor-bottom .8s 1
  animation-fill-mode: forwards


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
.scale-enter-active, .scale-leave-active
  transition: .3s
.scale-enter, .scale-leave-to /* .fade-leave-active below version 2.1.8 */ 
  height: 0


@keyframes wobble-hor-bottom
  0%,100%
    -webkit-transform: translateY(0)
    transform: translateY(0)
    -webkit-transform-origin: 50% 50%
    transform-origin: 50% 50%
    transform: scale(1.4)

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
  transition: .3s ease
.v-leave-to
  opacity: 0

.v-enter
  opacity: 0
.v-enter-active
  transition: .3s ease
.v-enter-to
  opacity: 1


// arrow
.arrow
  cursor: pointer
  border: solid black
  border-width: 0 5px 5px 0
  display: inline-block
  padding: 5px
  margin-left: 40px
  border-radius: 3px


.arrow_wrapper
  opacity: 0 
  transform: translateY(15px)
  transition: .5s

.right
  transform: rotate(-45deg)
  -webkit-transform: rotate(-45deg)
  

.left
  transform: rotate(135deg)
  -webkit-transform: rotate(135deg)
@media screen and (max-width: 600px)
  .input-content
    height: 170px
  .container
    overflow: scroll
    justify-content: flex-start
    max-height: 100vh
    width: 100vw
  .screenshot
    width: 70%

  .dot
    display: none
  .arrow
    display: none

  .slider
    overflow-y: scroll    
    -webkit-overflow-scrolling: touch


  .line-window
      width: 90%
      margin-top: 10px
      grid-template-columns: 100%
      grid-template-rows: 50px auto 170px

  .head
    line-height: 50px

  .inputclass
    width: 65% !important

  .send
    border-radius: 0px
    font-size: .8rem !important

  input
    -webkit-appearance: none

  .hh
    min-height: 20px

  .stickers_wraper
    height: 100px
</style>
