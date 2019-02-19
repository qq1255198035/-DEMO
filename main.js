
new Vue({
  el: "#app",
  data: {
    myCanvas: "",
    imgList: [
      "./img/0001.png",
      "./img/0002.png",
      "./img/0003.png",
      "./img/0007.png",
      "./img/0008.png",
      "./img/0010.png"
    ],
    fontStyle: ["加粗", "下划线", "上划线", "删除线", "倾斜"],
    fontWeight: "normal",
    underLine: false,
    fontStyleS: "normal",
    lineThrough: false,
    overLine: false,
    textarea: "",
    color1: "#000",
    color2: "",
    fontFamily: "",
    fontStyleV: [],
    $textarea: "",
    fontStyleArr: "",
    fontFamilyArr: [
      {
        label: "中文",
        options: [
          {
            label: "Microsoft YaHei"
          },
          {
            label: "PingFang SC"
          },
          {
            label: "Hiragino Sans GB"
          },
          {
            label: "宋体"
          }
        ]
      },
      {
        label: "英文/数字",
        options: [
          {
            label: "Impact"
          },
          {
            label: "Ink Free"
          },
          {
            label: "Lobster"
          }
        ]
      }
    ],
    dataPost: "",
    dataUrl: ""
  },
  mounted: function() {
    this.$nextTick(function() {
      this.myCanvas = new fabric.Canvas("a");
      this.bindCanvas();
      this.delSelected();
      this.$textarea = document.querySelector(".el-input");
    });
  },

  methods: {
    //delete space
    trim(value) {
      return value.replace(/(^\s*)|(\s*$)/g, "");
    },
    bindCanvas() {
      this.myCanvas.setBackgroundImage(
        "./img/white-2fbe8472bccef1a454b2b5e2ceb1e7293a86b971a0aa7522fe8f91.png",
        this.myCanvas.renderAll.bind(this.myCanvas)
      );
      this.myCanvas.setOverlayImage(
        "./img/bg.png",
        this.myCanvas.renderAll.bind(this.myCanvas),
        {
          opacity: 1,
          angle: 0,
          left: 300,
          top: 300,
          originX: "center",
          originY: "center"
        }
      );
    },
    changeFontStyle() {
      console.log(this.fontStyleV);

      this.fontStyleV.forEach(e => {
        if (e.indexOf("加粗") >= 0) {
          this.fontWeight = "bold";
          this.$textarea.style.fontWeight = "bold";
        } else if (e.indexOf("上划线") >= 0) {
          this.overLine = true;
          this.$textarea.style.textDecoration = "overline";
        } else if (e.indexOf("下划线") >= 0) {
          this.underLine = true;
          this.$textarea.style.textDecoration = "underline";
        } else if (e.indexOf("删除线") >= 0) {
          this.lineThrough = true;
          this.$textarea.style.textDecoration = "line-through";
        } else if (e.indexOf("倾斜") >= 0) {
          this.fontStyleS = "italic";
          this.$textarea.style.fontStyle = "italic";
        } else {
          this.fontStyleV = [];
          (this.fontWeight = "normal"), (this.underLine = false);
          this.fontStyleS = "normal";
          this.lineThrough = false;
          this.overLine = false;

          this.$textarea.style.fontWeight = "normal";
          this.$textarea.style.textDecoration = "none";
        }
      });
    },
    changeFontFamily() {
      this.$textarea.style.fontFamily = this.fontFamily;
      console.log(this.fontFamily);
    },
    selectImg(imgUrl) {
      var that = this;
      fabric.Image.fromURL(imgUrl, function(oImg) {
        that.myCanvas.add(
          oImg.set({
            originX: "center",
            originY: "center",
            left: 300,
            top: 300
          })
        );
      });
    },
    delSelected() {
      var that = this;
      that.myCanvas.on("mouse:down", function(options) {
        if (options.target) {
          document.onkeydown = function(e) {
            if (e.keyCode == 8) {
              that.myCanvas.remove(options.target);
            }
          };
        }
      });
    },
    changeTextColor(e) {
      this.$textarea.style.color = e;
    },
    changeTextBgColor(e) {
      this.$textarea.style.backgroundColor = e;
      //console.log(11)
    },
    addText() {
      var that = this;
      var text = new fabric.Text(that.trim(that.textarea), {
        left: 300,
        top: 300,
        fontFamily: that.fontFamily,
        fontSize: 25,
        fontWeight: that.fontWeight,
        underline: that.underLine,
        overline: that.overLine,
        linethrough: that.lineThrough,
        fontStyle: that.fontStyleS,
        //onCanvasEditing:true,
        textBackgroundColor: that.color2,
        //stroke: "#ff1318",
        strokeWidth: 1,
        fill: that.color1
      });
      if (that.textarea == 0) {
        that.$message({
          message: "文字不能为空",
          type: "warning"
        });
      } else {
        that.myCanvas.add(text);
        that.textarea = "";
        that.fontStyleV = [];
        (that.fontWeight = "normal"), (that.underLine = false);
        that.fontStyleS = "normal";
        that.lineThrough = false;
        that.overLine = false;
        that.fontFamily = "";
        that.$textarea.style.fontWeight = "normal";
        that.$textarea.style.textDecoration = "none";
        that.color2 = "";
        that.color1 = "#000";
        this.$textarea.style.backgroundColor = "white";
        this.$textarea.style.color = "#000";
      this.$textarea.style.fontFamily = "微软雅黑";
      }
    },
    saveImg() {
      this.dataPost = JSON.stringify(this.myCanvas.toJSON());
    },
    downLoadImg() {
      this.dataUrl = this.myCanvas.toDataURL();
      //console.log(this.dataUrl);
      //this.dataUrl = "";
    }
  }
});