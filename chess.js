$(function () {
    let box = $('.box');
    let black = {},white = {};
    let blank = {};
    let ai = true;
    for(let i=0;i<15;i++){
        for(let j=0;j<15;j++){
            $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo(box);
            blank[i+'_'+j] = true;
        }
    }
    let flag = true;
    box.on('click','.chess',function () {
        let _this = $(this);
        if(_this.hasClass('black') || _this.is('.white')){
            return ;
        }
        let coords = _this.attr('id');
        if(flag){
            black[coords] = true;
            delete blank[coords];
            $(this).addClass('black');
            if(isSuccess(black,coords)>=5){
                console.log('black success');
                box.off('click');
            }
            if(ai){
                let pos = aifn();
                white[pos] = true;
                $('#' +pos).addClass('white');
                delete blank[pos];
                if(isSuccess(white,pos)>=5){
                    console.log('white success');
                    box.off('click');
                }
            }
        }else{
                white[coords] = true;
                delete blank[coords];
                $(this).addClass('white');
                if(isSuccess(white,coords)>=5){
                    console.log('white success');
                    box.off('click');
                }
            }
    });
    function  aifn() {
        let blackScore = 0, whiteScore = 0;
        let pos1 = '',pos2 = '';
        for(let i in blank){
            let  score = isSuccess(white,i);
            if(score >=whiteScore){
                whiteScore = score;
                pos2 = i;
            }

        }
        for(let i in blank){
            let  score = isSuccess(black,i);
            if(score >=blackScore){
                blackScore = score;
                pos1 = i;
            }
        }
        return blackScore >= whiteScore ? pos1 : pos2 ;
    }
    function isSuccess(obj,coords) {
        let sp = 1 ,cz = 1 ,yx = 1, zx=1;
        let [x,y] = coords.split('_');
        let i = x * 1, j = y * 1;
        while(obj[i+'_'+(++j)]){
            sp++;
        }
        j=y*1;
        while(obj[i+'_'+(--j)]){
            sp++;
        }
        j=y*1;
        while(obj[++i+'_'+(j)]){
            cz++;
        }
        i=x*1;
        while(obj[--i+'_'+(j)]){
            cz++;
        }
        i=x*1;
        while(obj[++i+'_'+(++j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while(obj[--i+'_'+(--j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while(obj[--i+'_'+(++j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        while(obj[++i+'_'+(--j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        return Math.max(sp,cz,zx,yx);
    }

});