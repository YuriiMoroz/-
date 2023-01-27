import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Pusher from 'pusher-js'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  public indexArr = this.generateIndex()
  public colors = ['pink','red','orange','yellow','yellowgreen','green','lightblue','blue','purple','black']
  public color!: string;
  private cell!:HTMLDivElement;
  private colorBlock!:HTMLDivElement
  private isCell = false;
  private isColor = false;
  


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
//     Pusher.LogToConsole = true;

//     const pusher = new Pusher('25291c0752d6089a660d', {
//       cluster: 'eu'
//     });

//     const channel = pusher.subscribe('pixel-battle-channel');
//      chanel.bind('pixel-data', data => {
// //         parse data
// //         color = data['color'];
//     });
    Pusher.logToConsole = true;

    var pusher = new Pusher('eaf74954e926bfb7e254', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('pixel-battle-channel');
    channel.bind('paint-pixel', function(data) {
      alert(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        let x =parseInt(data[i].coord_x);
        let y =parseInt(data[i].coord_y);
        let color = data[i].color
        this.Paint2(x,y,color)
      }
    });
  }

  public generateIndex(){
    let str=''
    let arr=[]
    for(let i = 1;i<=42;i++){
        for(let j = 1;j<=86;j++){
          str = i+':'+j
          arr.push(str)
        }
      }

      return arr
  }

  public chouseCell(event:Event):void{
    if (!(this.cell == undefined)) {
      this.cell.style.border = '1px solid gray'
    }
    this.cell=<HTMLDivElement>event.target
    this.cell.style.border = '2px solid blue'
    this.isCell=true
  }

  public SaveColor(event:Event):void{
    if(!(this.colorBlock==undefined)){
      this.colorBlock.style.border = '1px solid black';
    }
    this.colorBlock=<HTMLDivElement>event.target
    this.colorBlock.style.border = '2px solid rgb(80, 80, 197)'
    this.color = this.colorBlock.style.backgroundColor
    this.isColor=true;
  }

  /**
   * paint
   */
  public Paint():void{
    if(this.isCell&&this.isColor){
      this.cell.style.backgroundColor=this.color;
      this.cell.style.border = 'none';
      let coords = this.cell.id.split(':')
      this.cell = <HTMLDivElement> document.querySelector('.anreal');
      this.isCell=false;
      this.http.post('http://127.0.0.1:5000/paint-pixel', {
        test: 'test-message2',
        coord_x: parseInt(coords[0]),
        coord_y: parseInt(coords[1]),
        color: this.color
      }).subscribe();
    }
  }

  public Paint2(x:number,y:number,color:string):void{
    this.cell = (<HTMLDivElement>document.getElementById(x+':'+y))
    this.cell.style.backgroundColor=color
    this.cell.style.border = 'none';
  }


  test():void{
    let str='1'
    console.log(str)
  }

}

//npm/yarn run ngcc
