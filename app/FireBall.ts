import { Bloc } from "./BlocTile";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";

export class FireBall extends Projectile {
    private direction:string=null;
    private targetEnemy : Array<Enemy> = null;
    private firingFireBall_lier : any = null;
    private refFiringFireBall:number = null;
    private isDesesperate : boolean = null;
	
    public constructor(refStage:createjs.Stage , unX: number, unY:number , sens:string, refMonde, refTurtle:Array<Enemy>, isADeseperate){
        super(refStage, unX, unY,refMonde);
        this.direction = sens;
        this.targetEnemy = refTurtle;
        this.gotoAndPlay("idle");
        this.isDesesperate = isADeseperate

        switch(this.direction){
          case "right":
            this.rotation = 270;
            break;
          case "left":
              this.rotation = 90;
            break;
          case "down":
              this.rotation = 0 ;
            break;
          case "up":
              this.rotation = 180;
            break;
        }

        this.firingFireBall_lier = this.firingFireBall.bind(this)
        this.refFiringFireBall = window.setInterval(this.firingFireBall_lier ,1000/60);
    }
    protected dessiner():void {
      window.lib.ClipFireBallVDeux.call(this);
        this.frameBounds = window.lib.ClipFireBallVDeux.prototype.frameBounds; 
        /*if (this.charged){
          window.lib.ClipLaser.call(this);
          this.frameBounds = window.lib.ClipLaser.prototype.frameBounds;
        }
        if (this.charged){
          window.lib.ClipFireBallVDeux.call(this);
          this.frameBounds = window.lib.ClipFireBallVDeux.prototype.frameBounds;
        }*/
    }
   
    private firingFireBall(): void {
      // pour que desesperate aille beacoup moins loin;
      if (this.isDesesperate){
        this.dureeDeVie = this.dureeDeVie - 1
        this.projectileSpeed= this.projectileSpeed+0.1
      }
        switch(this.direction){
            case "right":
              this.x = this.x+this.projectileSpeed;
              break;
            case "left":
                this.x = this.x - this.projectileSpeed;
              break;
            case "down":
                this.y = this.y+this.projectileSpeed;
              break;
            case "up":
                this.y = this.y-this.projectileSpeed;
              break;
          }
          let blnTouchSomething = true
          
          for (let cptE = 0; cptE<this.targetEnemy.length; cptE++){
            let position: createjs.Point = this.parent.localToLocal(this.x, this.y, this.targetEnemy[cptE]);
            let collision = this.targetEnemy[cptE].hitTest(position.x, position.y)
            if (/*this.x >= (this.targetEnemy[cptE].x -40) && this.x <= (this.targetEnemy[cptE].x +40) 
            && this.y >= (this.targetEnemy[cptE].y -80) && this.y <= (this.targetEnemy[cptE].y) */ collision == true){
                if (blnTouchSomething){
                  this.gotoAndPlay("impact")
                  blnTouchSomething = false;
                  this.targetEnemy[cptE].recoitDammage(1);
                  createjs.Sound.play("SonFireImpactMeca", {loop:0, volume:0.5})
                }    
            }
        }
        if (blnTouchSomething == false){
          this.gotoAndPlay("impact")
          window.clearInterval(this.refMinuterieProjectile)
          window.clearInterval(this.refFiringFireBall)
          this.refFiringFireBall = null;
          this.refMinuterieProjectile = window.setInterval(this.explosionProjectile_lier, 1000/60)
        }
    }
    protected arreter(): void {
        this.monMonde.despawnDeArray("fireball", this, this.arreterFireBall())   
    }
    public arreterFireBall():void {
      if (this.refFiringFireBall != null){
        window.clearInterval(this.refFiringFireBall)
        this.refFiringFireBall = null;
      }
      this.arreterProjectile()
    }

}