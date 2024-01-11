let video_input
let video_canvas
let video_ctx
const video_player = document.createElement('video')
const temp_canvas = document.createElement('canvas')
const temp_canvas_ctx = temp_canvas.getContext('2d')

video_player.addEventListener("play", () => {
    function step() {
    video_ctx.drawImage(video_player, 0, 0, video_canvas.width, video_canvas.height)
      for (let classes of ["yt-core-image--fill-parent-height","style-scope yt-img-shadow"]){
        let list = document.getElementsByClassName(classes)
        temp_canvas.width = list[0].width
        temp_canvas.height = list[0].height
        for (let i of list){
          let pos = i.getBoundingClientRect()
          if (pos.top-100+pos.height > 0 && pos.top-100 < video_player.height && pos.width !=0 && pos.height !=0){
            let data = video_ctx.getImageData(pos.left,pos.top-100,pos.width,pos.height)
            temp_canvas_ctx.putImageData(data,0,0)
            i.src = temp_canvas.toDataURL()
          }

        }
      }
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })


function new_video(){
    video_player.src=URL.createObjectURL(this.files[0])
    video_player.play()
}


window.addEventListener('load',(function() {
    let p = document.createElement('p')
    p.textContent = "choose video"
    document.getElementById("country-code").appendChild(p)
    video_input = document.createElement('input')
    video_input.type = 'file'
    video_input.onchange = new_video
    document.getElementById("country-code").appendChild(video_input)
    video_canvas = document.createElement('canvas')
    video_canvas.id = "video_canvas"
    video_ctx = video_canvas.getContext("2d",{ willReadFrequently: true })
    video_ctx.id="video_ctx"
    video_canvas.width =window.innerWidth
    video_canvas.height = window.innerHeight

    video_player.height = video_canvas.height
    video_player.width = video_canvas.width

})(),false)


addEventListener("resize", (event) => {
  console.log("resize")
  video_canvas.width = window.innerWidth
  video_canvas.height = window.innerHeight

  video_player.height = video_canvas.height
  video_player.width = video_canvas.width
})
