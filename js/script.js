// Inisialisasi peta
const map = L.map('map').setView([-6.802921427230038, 107.58011552638172], 12);

// Basemap OSM
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Basemap Google Maps
const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Basemap Google Satellite
const baseMapSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Satellite by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Tambahkan salah satu basemap secara default
basemapOSM.addTo(map);

// Daftar semua pilihan basemap
const baseMaps = {
  "OpenStreetMap": basemapOSM,
  "Google Maps": baseMapGoogle,
  "Google Satellite": baseMapSatellite
};

// Koordinat home
    const home = {
      lat: -6.802921427230038,
      lng: 107.58011552638172,
      zoom: 12
    };

// Tombol home custom
const homeControl = L.Control.extend({
  options: { position: 'topleft' },
  onAdd: function (map) {
  const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
  container.innerHTML = '<span style="font-size: 20px; margin: 2px;">🏠</span>';
  container.style.backgroundColor = 'white';
  container.style.cursor = 'pointer';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.width = '30px';   // opsional, biar simetris
  container.style.height = '30px';  // opsional
  container.title = 'Kembali ke Home';
  container.onclick = function () {
    map.setView([home.lat, home.lng], home.zoom);
    };
    return container;
  }
});
map.addControl(new homeControl());
    
// Fitur "My Location"
L.control.locate({
  position: 'topleft',
  flyTo: true,
  strings: {
    title: "Temukan lokasiku"
  },
  locateOptions: {
    enableHighAccuracy: true
  }
}).addTo(map);

// Fitur "Full Screen"
L.control.fullscreen({
  position: 'topleft',
  flyTo: true,
  strings: {
    title: "Layar Penuh",
  },
  forceSeparateButton: true
}).addTo(map);

const AdminKecamatan = new L.LayerGroup();
$.getJSON("./assets/data-spasial/AdminKecamatan.geojson", function (Catatan) {
L.geoJSON(Catatan, {
style: {
color : "#deae3e",
weight : 2,
opacity : 1,
dashArray: 'null',
lineJoin: 'round'
}
}).addTo(AdminKecamatan);
});
AdminKecamatan.addTo(map);

const CurahHujan = new L.LayerGroup();
$.getJSON("./assets/data-spasial/CurahHujan.geojson", function (Catatan) {
L.geoJSON(Catatan, {
style: {
color : "#777287",
weight : 2,
opacity : 1,
dashArray: 'null',
lineJoin: 'round'
}
}).addTo(CurahHujan);
});
CurahHujan.addTo(map);

const ErodibilitasTanah = new L.LayerGroup();
$.getJSON("./assets/data-spasial/ErodibilitasTanah.geojson", function (Kelas) {
L.geoJson(Kelas, {
style: function(feature) {
switch (feature.properties.Kelas) {
case 'Sedang': return {fillColor:"#d4c69d", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Tinggi': return {fillColor:"#c48d52", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
}
},
onEachFeature: function (feature, layer) {
layer.bindPopup('<b>Erodibilitas Tanah: </b>'+ feature.properties.Kelas)
}
}).addTo(ErodibilitasTanah);
});
ErodibilitasTanah.addTo(map);

const LULC = new L.LayerGroup();
$.getJSON("./assets/data-spasial/LULC.geojson", function (REMARK) {
L.geoJson(REMARK, {
style: function(feature) {
switch (feature.properties.REMARK) {
case 'Hutan Rimba': return {fillColor:"#9dd4ab", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Perkebunan/Kebun': return {fillColor:"#b5d49d", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Permukiman dan Tempat Kegiatan': return {fillColor:"#e64956", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Sawah': return {fillColor:"#a3f0d6", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Tegalan/Ladang': return {fillColor:"#e8f0a3", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Kebun Campuran': return {fillColor:"#d4ed15", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
}
},
onEachFeature: function (feature, layer) {
layer.bindPopup('<b>Tutupan Lahan: </b>'+ feature.properties.REMARK)
}
}).addTo(LULC);
});
LULC.addTo(map);
 
const Kemiringan_Lereng  = new L.LayerGroup();
$.getJSON("./assets/data-spasial/Kemiringan_Lereng.geojson", function (REMARK) {
L.geoJson(REMARK, {
style: function(feature) {
switch (feature.properties.REMARK) {
case 'Datar': return {fillColor:"#d9f0a3", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Landai': return {fillColor:"#addd8e", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Agak Curam': return {fillColor:"#fee391", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Curam': return {fillColor:"#fdae61", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Sangat Curam': return {fillColor:"#d73027", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
}
},
onEachFeature: function (feature, layer) {
layer.bindPopup('<b>Tutupan Lahan: </b>'+ feature.properties.REMARK)
}
}).addTo(Kemiringan_Lereng);
});
Kemiringan_Lereng.addTo(map);
       

const Kerawanan  = new L.LayerGroup();
 $.getJSON("./assets/data-spasial/Kerawanan.geojson", function (Tingkat_Kerawanan_Longsor) {
L.geoJson(Tingkat_Kerawanan_Longsor, {
style: function(feature) {
switch (feature.properties.Tingkat_Kerawanan_Longsor) {
case 'Tidak Rawan': return {fillColor:"#deebf7", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Agak Rawan': return {fillColor:"#9ecae1", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Cukup Rawan': return {fillColor:"#3182bd", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Rawan': return {fillColor:"#9e9ac8", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
case 'Sangat Rawan': return {fillColor:"#6a51a3", fillOpacity: 0.8, weight:
0.5, color: "transparent"};
}
},
onEachFeature: function (feature, layer) {
layer.bindPopup('<b>Tingkat Kerawanan: </b>'+ feature.properties.Tingkat_Kerawanan_Longsor)
}
}).addTo(Kerawanan);
});
Kerawanan.addTo(map);

const AdminDesa = new L.LayerGroup();
$.getJSON("./assets/data-spasial/AdminDesa.geojson", function (NAMOBJ) {
L.geoJson(NAMOBJ, {
style: function(feature) {
switch (feature.properties.NAMOBJ) {
case 'Cigugurgirang': return {fillColor:"#76c7f0", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Ciwaruga': return {fillColor:"#a4e672", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Sariwangi': return {fillColor:"#f7b267", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Cihanjuang': return {fillColor:"#c6a4e7", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Cihanjuangrahayu': return {fillColor:"#f48ca3", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Cihideung': return {fillColor:"#ffe066", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
case 'Karyawangi': return {fillColor:"#7cdedc", fillOpacity: 0.8, weight:
0.5, color: "#ffffff"};
}
},
onEachFeature: function (feature, layer) {
layer.bindPopup('<b>Desa: </b>'+ feature.properties.NAMOBJ)
}
}).addTo(AdminDesa);
});
AdminDesa.addTo(map);
                
const Component = {
"Batas Administrasi Kecamatan": AdminKecamatan,
"Batas Administrasi Desa": AdminDesa,
"Tutupan Lahan": LULC,
"Curah Hujan": CurahHujan,
"Kemiringan Lereng": Kemiringan_Lereng,
"Erodibilitas Tanah": ErodibilitasTanah,
"Tingkat Kerawanan Longsor": Kerawanan
};

L.control.layers(baseMaps, Component).addTo(map);

let legend = L.control({ position: "topright" });

legend.onAdd = function () { 
    let div = L.DomUtil.create("div", "legend"); 
    div.innerHTML = 
        // Judul Legenda 
        '<p style="font-size: 18px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Legenda</p>' + 
        // Legenda Layer Batas Administrasi Kec
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Batas Administrasi Kecamatan</p>' + 
        '<div style="background-color: #deae3e; height: 10px;"></div>Kecamatan Parongpong<br>'+
        // Legenda Layer Batas Administrasi Desa
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Batas Administrasi Desa</p>' + 
        '<div style="background-color: #76c7f0; height: 10px;"></div>Cigugurgirang<br>'+ 
        '<div style="background-color: #a4e672; height: 10px;"></div>Ciwaruga<br>'+ 
        '<div style="background-color: #f7b267; height: 10px;"></div>Sariwangi<br>'+ 
        '<div style="background-color: #c6a4e7; height: 10px;"></div>Cihanjuang<br>'+ 
        '<div style="background-color: #f48ca3; height: 10px;"></div>Cihanjuangrahayu<br>'+ 
        '<div style="background-color: #ffe066; height: 10px;"></div>Cihideung<br>'+ 
        '<div style="background-color: #7cdedc; height: 10px;"></div>Karyawangi<br>'+        
        // Layer Curah Hujan
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Curah Hujan</p>' + 
        '<div style="background-color: #777287; height: 10px;"></div>Rendah<br>'+
        // Layer Erodibilitas Tanah
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Erodibilitas Tanah</p>' + 
        '<div style="background-color: #d4c69d; height: 10px;"></div>Sedang<br>'+
        '<div style="background-color: #c48d52; height: 10px;"></div>Tinggi<br>'+
        // Layer LULC
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Tutupan Lahan</p>' + 
        '<div style="background-color: #9dd4ab; height: 10px;"></div>Hutan Rimba<br>' + 
        '<div style="background-color: #b5d49d; height: 10px;"></div>Perkebunan/Kebun<br>' + 
        '<div style="background-color: #a3f0d6; height: 10px;"></div>Sawah<br>' + 
        '<div style="background-color: #e8f0a3; height: 10px;"></div>Tegalan/Ladang<br>' + 
        '<div style="background-color: #d4ed15; height: 10px;"></div>Kebun Campuran<br>' +
        '<div style="background-color: #e64956; height: 10px;"></div>Permukiman dan Tempat Kegiatan<br>' + 
        //Layer Kemiringan Lereng
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Kemiringan Lereng</p>' + 
        '<div style="background-color: #d9f0a3; height: 10px;"></div>Datar<br>'+
        '<div style="background-color: #addd8e; height: 10px;"></div>Landai<br>'+ 
        '<div style="background-color: #fee391; height: 10px;"></div>Agak Curam<br>'+ 
        '<div style="background-color: #fdae61; height: 10px;"></div>Curam<br>'+
        '<div style="background-color: #d73027; height: 10px;"></div>Sangat Curam<br>'+
       //Layer Kerawanan
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Tingkat Kerawanan Longsor</p>' + 
        '<div style="background-color: #deebf7; height: 10px;"></div>Tidak Rawan<br>'+
        '<div style="background-color: #9ecae1; height: 10px;"></div>Agak Rawan<br>'+
        '<div style="background-color: #3182bd; height: 10px;"></div>Cukup Rawan<br>'+
        '<div style="background-color: #9e9ac8; height: 10px;"></div>Rawan<br>'+
        '<div style="background-color: #6a51a3; height: 10px;"></div>Sangat Rawan<br>';
    return div; 
}; 

legend.addTo(map);

