(function() {
    
    var imp = impress();
    // console.log("impress", impress);
    window.imp = imp;
    
    imp.init();
    var root = document.querySelector("body");

    imp.lib.gc.addEventListener( root, "impress:stepenter", function( event, data ) {
        console.log("step enter");
        console.log("event", event);
        console.log("data", data);
    }, false );

    imp.lib.gc.addEventListener( root, "impress:stepleave", function( event ) {
        console.log("step leave");
    }, false );




    var loadModelOnEngine = function(params) {
        params = params || {};

        var domNode = params.domNode;
        var modelPath = params.modelPath;

        var engine3d = new Engine3d();

        engine3d.init(domNode);
    
        engine3d.start();
    
        engine3d.startRotate(-1);
    
        engine3d.loadGeometry(modelPath, function(err, node) {
            if (err) {
                return console.log(err);
            }
    
            node.getChildMeshes().forEach(function(m) {
                if(m.material) {
                    m.material.alpha = 0.6;
                }
            });

            // var material = engine3d.getEmissiveMaterialRGB({g: 150, b: 255, a: 1});
            // engine3d.setMeshMaterial(node, material);
    
    
        });


    };



    // loadModelOnEngine({
    //     domNode: document.querySelector("#menu canvas"),
    //     modelPath: "./3dmodels/lock.glb"
    // });


    // loadModelOnEngine({
    //     domNode: document.querySelector("#smart-city canvas"),
    //     modelPath: "./3dmodels/city1.glb"
    // });






    // Custom events

    // document.addEventListener( "app:test", function(event) {
        
    //     console.log("event", event);

    // }, false );


    // var event = document.createEvent( "CustomEvent" );
    // event.initCustomEvent( "app:test", true, true, {
    //     data: {id: 3}
    // });
    // window.dispatchEvent( event );


    





})();