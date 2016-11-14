Class("xui.UI.CheckBox", ["xui.UI","xui.absValue"],{
    Initialize:function(){
        // compitable
        xui.UI.SCheckBox = xui.UI.CheckBox;
        var key="xui.UI.SCheckBox";
        xui.absBox.$type[key.replace("xui.UI.","")]=xui.absBox.$type[key]=key;
    },
    Instance:{
        activate:function(){
            this.getSubNode('FOCUS').focus();
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
               profile.getSubNode('MARK').tagClass('-checked', !!value);
            });
        },
        //update UI face
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['CAPTION']);
        }
    },
    Static:{
        Templates:{
            className:'{_className} ',
            style:'{_style} {_align}',
            FOCUS:{
                tabindex: '{tabindex}',
                MARK:{
                    $order:0,
                    className:'{_iconPosCls} xuifont',
                    $fonticon:'xui-uicmd-check'
                },
                ICON:{
                    $order:1,
                    className:'xuicon {imageClass}',
                    style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{imageDisplay}',
                    text:'{iconFontCode}' 
                },
                CAPTION:{
                    $order:2,
                    text:'{caption}'
                }
            }
        },
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            MARK:{
               cursor:'pointer',
               margin: '0 .334em 0 .1667em',
               'vertical-align':'middle'
            },
            FOCUS:{
                cursor:'default',
                'vertical-align':'middle',
                padding:'.1667em 0'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'font-size':'1em'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:'MARK',ICON:'ICON'},
            ClickEffected:{KEY:'MARK'},
            NavKeys:{FOCUS:1},
            onClick:function(profile, e, src){
                var p=profile.properties,b=profile.boxing();
                if(p.disabled)return false;
                if(p.readonly)return false;
                b.setUIValue(!p.$UIvalue,null,null,'click');
                if(profile.onChecked)b.onChecked(profile, e, p.$UIvalue);
                profile.getSubNode('FOCUS').focus();
            },
            FOCUS:{
                onKeydown:function(profile, e, src){
                    var key = xui.Event.getKey(e).key;
                    if(key ==' ' || key=='enter'){
                        profile.getRoot().onClick(true);
                        return false;
                    }
                }
            }
        },
        DataModel:{
            value:false,
            hAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action: function(v){
                    this.getRoot().css('textAlign',v);
                }
            },
            iconPos:{
                ini:'left',
                listbox:['left','right'],
                action:function(v){
                    this.getSubNode("MARK").removeClass('xui-float-left xui-float-right').addClass('xui-float-'+v);
                }
            },
            image:{
                format:'image',
                action: function(v){
                    xui.UI.$iconAction(this);
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON').css('backgroundPosition', value||'center');
                }
            },
            imageBgSize:{
                action: function(value){
                    this.getSubNode('ICON').css('backgroundSize', value||'');
                }
            },
            imageClass: {
                ini:'',
                action:function(v,ov){
                    xui.UI.$iconAction(this, 'ICON', ov);
                }
            },
            iconFontCode:{
                action:function(v){
                    xui.UI.$iconAction(this);
                }
            },
            caption:{
                ini:undefined,
                action: function(v){
                    v=(xui.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                }
            }
        },
        EventHandlers:{
            onChecked:function(profile, e, value){}
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data._align = 'text-align:'+data.hAlign+';';
            data._iconPosCls = 'xui-float-'+data.iconPos;
            return data;
        },
        _ensureValue:function(profile, value){
            return !!value;
        }
    }
});
