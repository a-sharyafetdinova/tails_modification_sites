var sequences = {'H2A':{'seq':'SGRGKQGGKTRAKAKTRSSRAGLQFPVGRVHRLLRKGNYAERVGAGAPVYLAAVLEYLTAEILELAGNAARDNKKTRIIPRHLQLAVRNDEELNKLLGRVTIAQGGVLPNIQSVLLPKK',
                       'features':[{'kind':'ptm','loc':1,'resid':39,'segid':'C'},
                                  {'kind':'ptm','loc':3,'resid':42,'segid':'C'},
                                  {'kind':'ptm','loc':6,'resid':45,'segid':'C'},
                                  {'kind':'ptm','loc':8,'resid':47,'segid':'C'},
                                  {'kind':'ptm','loc':35,'resid':84,'segid':'C'}]},
                 'H2B':{'seq':'PEPAKSAPAPKKGSKKAVTKTQKKDGKKRRKTRKESYAIYVYKVLKQVHPDTGISSKAMSIMNSFVNDVFERIAGEASRLAHYNKRSTITSREIQTAVRLLLPGELAKHAVSEGTKAVTKYTSAK',
                       'features':[{'kind':'ptm','loc':0,'resid':39,'segid':'D'},
                                  {'kind':'ptm','loc':3,'resid':42,'segid':'D'},
                                  {'kind':'ptm','loc':6,'resid':45,'segid':'D'},
                                  {'kind':'ptm','loc':8,'resid':47,'segid':'D'},
                                  {'kind':'ptm','loc':35,'resid':84,'segid':'D'}]},
                 'H3':{'seq':'ARTKQTARKSTGGKAPRKQLATKAARKSAPATGGVKKPHRYRPGTVALREIRRYQKSTELLIRKLPFQRLVREIAQDFKTDLRFQSSAVMALQEASEAYLVALFEDTNLCAIHAKRVTIMPKDIQLARRIRGERA',
                       'features':[{'kind':'ptm','loc':1,'resid':39,'segid':'C'},
                                  {'kind':'ptm','loc':3,'resid':42,'segid':'C'},
                                  {'kind':'ptm','loc':6,'resid':45,'segid':'C'},
                                  {'kind':'ptm','loc':8,'resid':47,'segid':'C'},
                                  {'kind':'ptm','loc':35,'resid':84,'segid':'C'}]},
                 'H4':{'seq':'SGRGKGGKGLGKGGAKRHRKVLRDNIQGITKPAIRRLARRGGVKRISGLIYEETRGVLKVFLENVIRDAVTYTEHAKRKTVTAMDVVYALKRQGRTLYGFGG',
                       'features':[{'kind':'ptm','loc':1,'resid':39,'segid':'C'},
                                  {'kind':'ptm','loc':3,'resid':42,'segid':'C'},
                                  {'kind':'ptm','loc':6,'resid':45,'segid':'C'},
                                  {'kind':'ptm','loc':8,'resid':47,'segid':'C'},
                                  {'kind':'ptm','loc':35,'resid':84,'segid':'C'}]},
                 
                 
                 
                }

var colors = {'H2A':'rgb(214, 217, 137)','H2B':'rgb(217, 137, 137)',
              'H3':'rgb(148, 180, 209)','H4':'rgb(148, 209, 156)',}
document.addEventListener("DOMContentLoaded", function ()  {
      window.stage = new NGL.Stage("viewport",{ backgroundColor:"#FFFFFF" });
      window.stage.setParameters({cameraType: "orthographic"});
      window.stage.loadFile("https://files.rcsb.org/download/3LZ0.pdb").then(function (nucl) {
        var aspectRatio = 2;
        var radius = 1.5;

        nucl.addRepresentation('cartoon', {
           "sele": ":A :E", "color": 0x94b4d1,"aspectRatio":aspectRatio, "radius":radius,"radiusSegments":1,"capped":0 });
        nucl.addRepresentation('cartoon', {
           "sele": ":B :F", "color": 0x94d19c,"aspectRatio":aspectRatio, "radius":radius,"radiusSegments":1,"capped":0 });
        nucl.addRepresentation('cartoon', {
           "sele": ":C :G", "color": 0xd6d989,"aspectRatio":aspectRatio, "radius":radius,"radiusSegments":1,"capped":0 });
        nucl.addRepresentation('cartoon', {
           "sele": ":D :H", "color": 0xd98989,"aspectRatio":aspectRatio, "radius":radius,"radiusSegments":1,"capped":0 });
        nucl.addRepresentation('cartoon', {
           "sele": "nucleic", "color": 0xd6d6d6,"aspectRatio":aspectRatio, "radius":radius,"radiusSegments":1,"capped":0 });
        nucl.addRepresentation('base', {
           "sele": "nucleic", "color": 0xd6d6d6});
        nucl.autoView();

        // window.stage.animationControls.rotate([ 0.5, 0.5, 0, 0.7071068 ],0);
        const to_rad = 3.14159265359/180
        window.stage.viewerControls.spin([1,0,0],-90*to_rad)
        
        window.stage.viewerControls.spin([0,0,1],180*to_rad)
        window.stage.viewerControls.spin([0,1,0],12*to_rad)

        

  var seq_div = document.getElementById("sequences");
  for (const [hist_name, seq_dict] of Object.entries(sequences)) {
    // seq_div.innerHTML += '<p>'+  hist_name + ':</p>';
    var container = document.createElement("p");
    container.appendChild(document.createTextNode(hist_name));
    seq_div.appendChild(container);

    var residue_spans = [];
    
    
    for (let c of seq_dict['seq']) {
      var container = document.createElement("span");
      container.onselectstart = function(){
                                            return false;
                                          }
      var text = document.createTextNode(c);
      container.appendChild(text);
      container.style.color = "black";
      container.style.background = colors[hist_name];
      container.style.cursor = 'default'
      container.style.fontFamily = 'monospace'
      residue_spans.push(container);
      seq_div.appendChild(container);
    };
    for (const feature of seq_dict['features']) {
      let letter = residue_spans[feature['loc']]
      letter.style.cursor = "pointer";
      letter.style.color = "red";
      // letter.loc = feature['loc'];
      
      letter.highlight_sel = nucl.addRepresentation('hyperball', {'sele':feature['resid'].toString() +":"+ feature['segid'],
                                                               "color":'red',
                                                               "radius":5}) ;           
      letter.highlight_sel.setVisibility(false);
      letter.onclick = function() {
        var state = letter.highlight_sel.getVisibility();
        letter.highlight_sel.setVisibility( !state );
        letter.style.background = !state? "lime" : colors[hist_name];
      };
    }
  }
  
}); 
});
                
