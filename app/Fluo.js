var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Entity"], function (require, exports, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fluo = void 0;
    var Fluo = /** @class */ (function (_super) {
        __extends(Fluo, _super);
        function Fluo(refStage, unX, unY, refTPlateform, refMonde, refAfficheur, whichPlayer) {
            var _this = _super.call(this, refStage, unX, unY, refTPlateform) || this;
            _this.bouger_lier = null;
            _this.refMinuterie = null;
            _this.jump_lier = null;
            _this.isJumping = null;
            _this.valeurTempsCourbe = null;
            _this.refMinuterieJump = null;
            _this.animationEye_lier = null;
            _this.refMinuterieEye = null;
            _this.tTouche = [false, false, false, false, false];
            _this.vitesse = null;
            _this.pvRestant = null;
            _this.cptFluoMvn = null;
            _this.cptFluoEye = null;
            _this.playIdle_lier = null;
            _this.ammountOfIdle = null;
            _this.mouvementOrder = null;
            _this.refMinuterieFallOff = null;
            _this.fallOff_lier = null;
            _this.monMonde = null;
            _this.monAfficheur = null;
            _this.cptInvicibility = null;
            _this.refMinuterieInvincibility = null;
            _this.clignoteDammage_lier = null;
            _this.playerId = null;
            _this.playerId = whichPlayer;
            _this.dessiner();
            _this.x = unX;
            _this.y = unY;
            _this.mouseChildren = false;
            _this.monMonde = refMonde;
            _this.monAfficheur = refAfficheur;
            _this.gotoAndPlay("idle");
            window.onkeydown = _this.detectKeyDown.bind(_this);
            window.onkeyup = _this.detectKeyUp.bind(_this);
            _this.tTouche = new Array;
            _this.tTouche = [false, false, false, false, false, false];
            _this.cptInvicibility = Fluo.AMOUNTINVINCIBILITY;
            _this.vitesse = 5;
            _this.cptFluoMvn = 1;
            _this.cptFluoEye = 1;
            _this.ammountOfIdle = 0;
            _this.bouger_lier = _this.bouger.bind(_this);
            _this.refMinuterie = window.setInterval(_this.bouger_lier, 1000 / 30);
            _this.jump_lier = _this.jump.bind(_this);
            _this.refMinuterieJump = window.setInterval(_this.jump_lier, 1000 / 30);
            _this.animationEye_lier = _this.animationEye.bind(_this);
            _this.refMinuterieEye = window.setInterval(_this.animationEye_lier, 1000 / 30);
            _this.fallOff_lier = _this.fallOff.bind(_this);
            _this.refMinuterieFallOff = window.setInterval(_this.fallOff_lier, 1000 / 30);
            _this.clignoteDammage_lier = _this.clignoteDammage.bind(_this);
            //Pour gerer ses animation;
            _this.mouvementOrder = "right"; // sinon boule de feu crash au début
            _this.gotoAndStop("idle");
            _this.playIdle_lier = _this.playIdle.bind(_this);
            _this.addEventListener("tick", _this.playIdle_lier);
            _this.pvRestant = Fluo.PVMAX;
            return _this;
        }
        Fluo.prototype.dessiner = function () {
            window.lib.ClipFluo.call(this);
            this.frameBounds = window.lib.ClipFluo.prototype.frameBounds;
            if (this.playerId == 0) {
                window.lib.ClipFluo.call(this);
                this.frameBounds = window.lib.ClipFluo.prototype.frameBounds;
            }
            if (this.playerId == 1) {
                window.lib.ClipNeo.call(this);
                this.frameBounds = window.lib.ClipNeo.prototype.frameBounds;
            }
            this.scaleX = 0.5;
            this.scaleY = 0.5;
        };
        Fluo.prototype.detectKeyDown = function (evenement) {
            // ESPACE = 32;
            // FLECHE_HAUT = 38;
            // FLECHE_BAS = 40;
            // FLECHE_GAUCHE = 37;
            // FLECHE_DROITE = 39;
            switch (evenement.keyCode) {
                case 39:
                case 68:
                    //flèche droite
                    this.tTouche[0] = true;
                    this.mouvementOrder = "right";
                    evenement.preventDefault();
                    break;
                case 37:
                case 65:
                    //flèche gauche
                    this.tTouche[1] = true;
                    this.mouvementOrder = "left";
                    evenement.preventDefault();
                    break;
                case 38:
                case 87:
                    //Flèche haut
                    this.tTouche[2] = true;
                    this.mouvementOrder = "up";
                    evenement.preventDefault();
                    break;
                case 32:
                    this.tTouche[5] = true;
                    //this.mouvementOrder = "up"
                    evenement.preventDefault();
                    break;
                case 40:
                case 83:
                    this.tTouche[3] = true;
                    this.mouvementOrder = "down";
                    evenement.preventDefault();
                    break;
                case 16:
                    this.tTouche[4] = true;
                    evenement.preventDefault();
                    break;
                case 70:
                case 81:
                    if (this.playerId == 1) {
                        this.monMonde.creationFireBall(this.mouvementOrder, this.x, this.y, false, true);
                    }
                    else {
                        this.monMonde.creationFireBall(this.mouvementOrder, this.x, this.y, false, false);
                    }
                    break;
            }
            if (this.refMinuterie == null) {
                this.refMinuterie = window.setInterval(this.bouger_lier, 1000 / 30);
            }
        };
        Fluo.prototype.detectKeyUp = function (evenement) {
            // ESPACE = 32;
            // FLECHE_HAUT = 38;
            // FLECHE_BAS = 40;
            // FLECHE_GAUCHE = 37;
            // FLECHE_DROITE = 39;
            switch (evenement.keyCode) {
                case 39:
                case 68:
                    //flèche droite
                    this.tTouche[0] = false;
                    evenement.preventDefault();
                    break;
                case 37:
                case 65:
                    //flèche gauche
                    this.tTouche[1] = false;
                    evenement.preventDefault();
                    break;
                case 38:
                case 87:
                    this.tTouche[2] = false;
                    evenement.preventDefault();
                    break;
                case 40:
                case 83:
                    this.tTouche[3] = false;
                    evenement.preventDefault();
                    break;
                case 32:
                    this.tTouche[5] = false;
                    evenement.preventDefault();
                    break;
                case 16:
                    this.tTouche[4] = false;
                    evenement.preventDefault();
                    break;
                case 70:
                case 81:
                    this.tTouche[5] = false;
                    evenement.preventDefault();
                    break;
            }
        };
        /**S'assure que le protagoniste soie toujours animé meme lorsque immobile */
        Fluo.prototype.playIdle = function () {
            if (this.cptFluoEye == 0) {
                if (this.currentLabel != "idle" && this.currentLabel != "idle_2") {
                    this.gotoAndPlay("idle");
                    this.fluo_eye.gotoAndPlay("idle");
                }
                if (this.currentFrame == 18) {
                    var random = Math.floor(Math.random() * 6 + this.ammountOfIdle);
                    if (random >= 6) {
                        random = Math.floor(Math.random() * 6);
                        this.ammountOfIdle = 0;
                        if (random == 1 || random == 2) {
                            this.gotoAndPlay("idle_2");
                        }
                        if (random == 3 || random == 4) {
                            this.gotoAndPlay("idle_3");
                        }
                        if (random == 5) {
                            this.gotoAndPlay("idle");
                        }
                    }
                    else {
                        this.ammountOfIdle++;
                    }
                }
                /*if (this.fluo_eye.currentFrame == 1){
                  let random = Math.floor(Math.random()*2)
                  if (random == 0){
                    this.fluo_eye.gotoAndPlay("idle_2")
                  }
                } */
            }
        };
        Fluo.prototype.bouger = function () {
            var blnEnMvt = false;
            /* Shift pour courrir*/
            if (this.tTouche[4] == true) {
                blnEnMvt = true;
                this.vitesse = 2.5;
            }
            else {
                this.vitesse = 2;
            }
            /* Déplaclement */
            // check si il y a un mur dans le chemin
            var blnMurDroite = false;
            var blnMurGauche = false;
            for (var cpt = 0; cpt < this.tPlateforme.length; cpt++) {
                if (this.tPlateforme[cpt].sorteDeTile == "Bloc") {
                    if (this.y < this.tPlateforme[cpt].y + 100 && this.y > this.tPlateforme[cpt].y) {
                        if (this.x > this.tPlateforme[cpt].x - 45 && this.x < this.tPlateforme[cpt].x) {
                            this.x = this.tPlateforme[cpt].x - 50;
                            blnMurDroite = true;
                        }
                        if (this.x < this.tPlateforme[cpt].x + 45 && this.x > this.tPlateforme[cpt].x) {
                            this.x = this.tPlateforme[cpt].x + 50;
                            blnMurGauche = true;
                        }
                    }
                }
            }
            if (this.tTouche[0] == true) { // droite
                if (blnMurDroite == false) {
                    this.x = this.x + this.cptFluoMvn * this.vitesse;
                }
                if (this.x > window.lib.properties.width) {
                    this.x = window.lib.properties.width;
                }
                blnEnMvt = true;
            }
            if (this.tTouche[1] == true) { //  gauche
                if (blnMurGauche == false) {
                    this.x = this.x - this.cptFluoMvn * this.vitesse;
                }
                if (this.x < 0) {
                    this.x = 0;
                }
                blnEnMvt = true;
            }
            /*//Pour descendre plus vite
            if (this.tTouche[3] == true){
              //blnEnMvt = true;
              if (this.isFalling== true){
                this.y = this.y + this.cptFluoMvn * this.vitesse;
              }
              
            }*/
            /** N'a q'une animation de course que lorsqu'il est au sol */
            if (this.isOnFloor) {
                this.gotoAndStop("move");
                var frameMove = this.currentFrame; // Move
                this.gotoAndStop(frameMove + this.cptFluoMvn); // Move
                if (this.fluo_scarf.currentLabel == "Calme") {
                    this.fluo_scarf.gotoAndPlay("entre-deux"); // écharpe
                }
                if (this.fluo_bras_droit.currentLabel == "idle" || this.fluo_bras_droit.currentLabel == "Move") {
                    this.fluo_bras_droit.gotoAndStop(40 + this.cptFluoMvn); //arm
                }
            }
            /** Check si il est encore en mouvement */
            //si oui, augmente son cptFluoMvn
            if (blnEnMvt == true) {
                this.cptFluoMvn = this.cptFluoMvn + 2;
                if (this.cptFluoMvn > 5 && this.tTouche[4] == false) {
                    this.cptFluoMvn = 5;
                }
                if (this.cptFluoMvn > 6 && this.tTouche[4] == true) {
                    this.cptFluoMvn = 6;
                }
            }
            if (this.cptFluoMvn > 0) {
                this.cptFluoMvn = this.cptFluoMvn - 1;
            }
            else {
                this.cptFluoMvn = 0;
                if (blnEnMvt == false) {
                    this.gotoAndPlay(0);
                    if (this.fluo_bras_droit.currentLabel == "Move") {
                        this.fluo_bras_droit.gotoAndPlay(0);
                    }
                    this.fluo_scarf.gotoAndPlay("Calme");
                    window.clearInterval(this.refMinuterie);
                    this.refMinuterie = null;
                }
            }
        };
        Fluo.prototype.animationEye = function () {
            var blnJugeMouvement = false;
            for (var cpt = 0; cpt < 4; cpt++) {
                if (this.tTouche[cpt]) {
                    blnJugeMouvement = true;
                }
            }
            if (blnJugeMouvement) {
                this.cptFluoEye = this.cptFluoEye + 2;
            }
            this.cptFluoEye = this.cptFluoEye - 1; //s'assure de la durrée des action
            if (this.cptFluoEye < 0) {
                this.cptFluoEye = 0;
            }
            if (this.cptFluoEye > 5) {
                this.cptFluoEye = 5;
            }
            var currentFrame = 0;
            this.fluo_eye.gotoAndStop(this.mouvementOrder);
            if (this.mouvementOrder == "right" || this.mouvementOrder == "left") {
                //this.fluo_eye.gotoAndStop(14+refCpt) le scale est flip pour la gauche
                this.fluo_eye.gotoAndStop("right");
            }
            if (this.mouvementOrder == "left" && this.scaleX != -0.5) {
                this.scaleX = -0.5;
            }
            if (this.mouvementOrder == "right" && this.scaleX != 0.5) {
                this.scaleX = 0.5;
            }
            currentFrame = this.fluo_eye.currentFrame;
            this.fluo_eye.gotoAndStop(currentFrame + this.cptFluoEye);
        };
        Fluo.prototype.jump = function () {
            //pour sauter
            if (this.tTouche[5] && this.isOnFloor == true) {
                this.isFalling = true;
                this.isJumping = true;
            }
            if (this.isJumping == true) {
                this.isJumping == true;
                if (this.currentLabel != "jump") {
                    this.gotoAndPlay("jump");
                }
                if (this.fluo_bras_droit.currentLabel == "Move") {
                    this.fluo_bras_droit.gotoAndStop("idle"); //arm
                }
                if (this.fluo_scarf.currentLabel == "Calme") {
                    this.fluo_scarf.gotoAndPlay("entre-deux");
                }
                if (this.refMinuterieGravity != null) {
                    if (this.isOnFloor == true) {
                        this.deactivateGravity();
                        this.cptFluoMvn = 1;
                        this.valeurTempsCourbe = 0; //this.tempsPasserAir-10; 
                    }
                }
                this.isFalling = true;
                if (
                /*minimum jump*/ (this.tTouche[5] == false && this.tempsPasserAir >= 5) ||
                    /* max jump*/ this.tempsPasserAir >= 15) {
                    this.valeurTempsCourbe++;
                }
                if (this.valeurTempsCourbe <= 0) {
                    this.valeurTempsCourbe = 0;
                }
                var forceVersHaut = (10 - this.valeurTempsCourbe);
                this.y = this.y - forceVersHaut;
                if (forceVersHaut <= 0) {
                    this.isJumping = false;
                    this.valeurTempsCourbe = 0;
                    this.activateGravity();
                }
            }
            else {
                this.activateGravity();
                this.isFalling = true;
                this.isJumping = false;
            }
            /*if (this.tTouche[5] == false || this.tempsPasserAir >= 25) {
              this.activateGravity();
              this.isFalling = true;
              this.isJumping = false
            }*/
        };
        Fluo.prototype.fallOff = function () {
            if (this.x <= 0) {
                //this.y = 100;
                this.x = 100;
                this.recoitDammage(1);
            }
            if (this.y >= window.lib.properties.height + 150) {
                this.monMonde.terminerNiveau("gameOver");
                //this.recoitDammage(8)
                //this.cptInvicibility = 0;
            }
        };
        Fluo.prototype.recoitDammage = function (numbreDammage) {
            if (this.cptInvicibility < 0) {
                this.pvRestant = this.pvRestant - numbreDammage;
                this.monAfficheur.updateHitPoint(this.pvRestant);
                this.refMinuterieInvincibility = window.setInterval(this.clignoteDammage_lier, 1000 / 10);
                this.monMonde.creationFireBall("left", this.x - 40, this.y, true, false);
                this.monMonde.creationFireBall("left", this.x, this.y - 40, true, false);
                this.monMonde.creationFireBall("left", this.x, this.y + 40, true, false);
                this.monMonde.creationFireBall("right", this.x + 40, this.y, true, false);
                this.monMonde.creationFireBall("right", this.x, this.y + 40, true, false);
                this.monMonde.creationFireBall("right", this.x, this.y - 40, true, false);
                this.monMonde.creationFireBall("down", this.x, this.y, true, false);
                this.monMonde.creationFireBall("up", this.x, this.y, true, false);
                if (this.pvRestant <= 0) {
                    this.monMonde.terminerNiveau("gameOver");
                    this.arreter();
                }
                this.cptInvicibility = Fluo.AMOUNTINVINCIBILITY;
            }
        };
        Fluo.prototype.clignoteDammage = function () {
            if (this.cptInvicibility > 0) {
                var currentHeadFrame = this.fluo_head.currentFrame;
                this.fluo_head.gotoAndPlay(currentHeadFrame + 14);
            }
            else {
                if (this.pvRestant <= (Fluo.PVMAX / 2)) {
                    this.fluo_head.gotoAndPlay("LowHealth");
                }
                else {
                    this.fluo_head.gotoAndPlay("fullHealth");
                }
                window.clearInterval(this.refMinuterieInvincibility);
            }
        };
        Fluo.prototype.arreter = function () {
            this.arreterSquire();
        };
        Fluo.prototype.arreterSquire = function () {
            this.monAfficheur.updateHitPoint(0);
            window.clearInterval(this.refMinuterie);
            this.refMinuterie = null;
            window.clearInterval(this.refMinuterieEye);
            this.refMinuterieEye = null;
            window.clearInterval(this.refMinuterieFallOff);
            this.refMinuterieFallOff = null;
            window.clearInterval(this.refMinuterieJump);
            this.refMinuterieJump = null;
            window.clearInterval(this.refMinuterieInvincibility);
            this.refMinuterieInvincibility = null;
            this.arreterEntity();
            window.onkeydown = null;
            window.onkeyup = null;
        };
        Fluo.PVMAX = 8;
        Fluo.AMOUNTINVINCIBILITY = 35;
        return Fluo;
    }(Entity_1.Entity));
    exports.Fluo = Fluo;
});
//# sourceMappingURL=Fluo.js.map