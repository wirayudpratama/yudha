window.onload = function (e) {
    liff.init(function () {
        getP();
    });
};

function getP(){
    var tipe = getParameterByName('type')
    if (!tipe) {
        document.getElementById('textx').addEventListener('click', function () {
            liff.sendMessages([{
                type: 'text',
                text: 'line://app/1602687308-GXq4Vvk9?type=text&text=Yudha%20Ganteng\n\n\ntype=text\ntext=your text'
            }]).then(function () {
                liff.closeWindow();
            });
        });
        document.getElementById('imagex').addEventListener('click', function () {
            liff.sendMessages([{
                type: 'text',
                text: 'line://app/1602687308-GXq4Vvk9?type=image&img=http://imgur.com/a/NMWwbMJ.jpg\n\ntype => image img => Link (must be HTTPS)'
            }]).then(function () {
                liff.closeWindow();
            });
        });
        document.getElementById('videox').addEventListener('click', function () {
            liff.sendMessages([{
                type: 'text',
                text: 'line://app/1602687308-GXq4Vvk9?type=video&ocu=https://tinyurl.com/y8og3or5&piu=https://images6.alphacoders.com/710/thumb-350-710132.png\n\ntype => video\nocu => video url piu => preview image'
            }]).then(function () {
                liff.closeWindow();
            });
        });
        document.getElementById('audiox').addEventListener('click', function () {
            liff.sendMessages([{
                type: 'text',
                text: 'line://app/1602687308-GXq4Vvk9?type=audio&link=https://platelets.fun/public/sounds/music.mp3'
            }]).then(function () {
                liff.closeWindow();
            });
        });
        document.getElementById('stickerx').addEventListener('click', function () {
            liff.sendMessages([{
                type: 'text',
                text: 'Animation: line://app/1602687308-GXq4Vvk9?type=sticker&stk=anim&sid=32128231&pkg=3099312\n\nNo Animation: line://app/1602687308-GXq4Vvk9?type=sticker&stk=noanim&sid=32128231&pkg=3099312\n\ntype => sticker stk => anim / noanim sid => sticker id\npkg => packages id'
            }]).then(function () {
                liff.closeWindow();
            });
        });
        document.getElementById('mex').addEventListener('click', function () {
            liff.sendMessages([{
                type: 'text',
                text: 'line://app/1602687308-GXq4Vvk9?type=profile'
            }]).then(function () {
                liff.closeWindow();
            });
        });
    } else {
        makeText();
        makeImage();
        makeVideo();
        makeAudio();
        makeFlex();
        makeSticker();
        meProfile();
    }
    }

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getProfile(){
    liff.getProfile().then(function (profile) {
        document.getElementById('userid').textContent = 'Hai  ' + profile.displayName;
        document.getElementById('main').src = profile.pictureUrl;
        document.getElementById('close').addEventListener('click', function () {
            liff.closeWindow();
        });
    });
}

function makeText(){
    var tipe = getParameterByName('type');
    if (tipe === 'text') {
        liff.sendMessages([{
            type: 'text',
            text: getParameterByName('text')
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function makeImage(){
    var tipe = getParameterByName('type');
    if (tipe === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('img'),
            previewImageUrl: getParameterByName('img')
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function makeVideo(){
    var tipe = getParameterByName('type');
    if (tipe === 'video') {
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('ocu'),
            previewImageUrl: getParameterByName('piu')
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function makeAudio(){
    var tipe = getParameterByName('type');
    if (tipe === 'audio') {
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: 60000
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function makeSticker(){
    var tipe = getParameterByName('type');
    if (tipe === 'sticker') {
        var stk = getParameterByName('stk');
        var sid = getParameterByName('sid');
        var pkg = getParameterByName('pkg');
        var ep = '';
        if (stk === 'anim') {
            ep = "/IOS/sticker_animation@2x.png";
        } else {
            ep = "/IOS/sticker@2x.png";
        }
        liff.sendMessages([{
            type: "template",
            altText: "Flex",
            template: {
                type: "image_carousel",
                columns: [
                    {
                        imageUrl: "http://imgur.com/a/NMWwbMJ.jpg",
                        action: {
                            type: "uri",
                            uri: "line://ti/p/%40175qduzr"
                        }
                    }
                ]
            }
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function meProfile(){
    var tipe = getParameterByName('type');
    liff.getProfile().then(function (prof) {
        var stat = prof.statusMessage;
        if (stat == null) {
            var stat = " - ";
        }
        if (stat.length > 60) {
            var stat = "Status Message is to long! Max 60 words";
        }
        if (tipe === 'profile') {
            liff.sendMessages([{
                type: "template",
                altText: "Profile "+prof.displayName,
                template: {
                    type: "buttons",
                    thumbnailImageUrl: prof.pictureUrl,
                    imageAspectRatio: "square",
                    imageSize: "cover",
                    title: prof.displayName,
                    text: stat,
                    actions: [
                        {
                            type:"uri",
                            label:"Me",
                            uri:"line://app/1602687308-GXq4Vvk9?type=profile"
                        }
                    ]
                }
            }]).then(function () {
                liff.closeWindow();
            });
        }
    });
}

function makeFlex() {
    var tipe = getParameterByName('type');
    if (tipe === 'flex') {
        // var stk = getParameterByName('stk')
        liff.sendMessages([{
            type: "template",
            altText: "Flex",
            template: {
                type: "image_carousel",
                columns: [
                    {
                        imageUrl: "http://imgur.com/a/NMWwbMJ.jpg",
                        action: {
                            type: "uri",
                            uri: "line://ti/p/%40175qduzr"
                        }
                    }
                ]
            }
        }]).then(function () {
            liff.closeWindow();
        });
    }
}
