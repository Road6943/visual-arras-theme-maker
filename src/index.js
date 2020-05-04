new ClipboardJS('#copyBtn');

let stageWidth = 800;
let stageHeight = 500;

let app = new Vue({
  el: '#app',
  data: {
    stageSize: {
      width: stageWidth,
      height: stageHeight,
    },
    
    theme: {
      name: 'Enter Your Theme Name Here',
      content: {
        teal: '#7ADBBC',        // Shield Bar
        lgreen: '#B9E87E',      // Main Health Bar
        orange: '#E7896D',      // Triangles
        yellow: '#FDF380',      // Bullet Penetration in Build Menu
        lavender: '#B58EFD',    // Pentagon Nest Background (Rarely Used, also known as Color 4)
        pink: '#EF99C3',        // Crashers
        vlgrey: '#E8EBF7',      // Eggs
        lgrey: '#AA9F9E',       // Color 7, Almost Never Used
        guiwhite: '#FFFFFF',    // In-Game Text
        black: '#484848',       // Borders, Text Outlines, Health Bar Background
        blue: '#3CA4CB',        // Top-Left Team (4TDM), Left Team (2TDM), FFA Player Color
        green: '#8ABC3F',       // Top-Right Team (4TDM), Right Team (2TDM)
        red: '#E03E41',         // Bottom-Right Team (4TDM), FFA Enemy Color
        gold: '#EFC74B',        // Squares, EXP Bar
        purple: '#8D6ADF',      // Pentagons
        magenta: '#CC669C',     // Bottom-Right Team (4TDM)
        grey: '#A7A7AF',        // Barrels, Rocks, 
        dgrey: '#726F6F',       // Room Boundaries
        white: '#DBDBDB',       // Map Background
        guiblack: '#000000',    // controls whether the map border is lighter(#FFFFFF)/darker(#000000) than map background
        paletteSize: 10,
        border: 0.5,
      },
    },
    
    roomBoundaryColor: "#C1C1C1",
    showMoreOptions: false,
    
  },
  
  methods: {
    
    changeColor: function(color) {
      
      if (color === "white") {
        const confirmed = confirm("By clicking OK, you will proceed to change the color of the entire map background. Click cancel if you were trying to change the color of anything other than the map background color.");
        
        if (!confirmed) return;
      }
      
        const picker = document.querySelector("#generalColorPicker");
        picker.value = this.theme.content[color];
        picker.click();
        picker.onchange = () => {
          this.theme.content[color] = picker.value;
          this.setRoomBoundaryColor();
        }
    },
    
    
    changeBorderSize: function() {
      let input = prompt("Please enter a new border size. The default value is 0.5");
      input = parseFloat(input);
      
      // if input is 0 (a falsey value, then set border to 0)
      if (input === 0) {
        this.theme.content.border = input;
      }
      // all other falsey values that are not 0 are the result of incorrect user input, so set the border to the default of 0.5 if so
      else {
        this.theme.content.border = input || 0.5;
      }
    },
    
    
    fillDefaultTheme: function() {
      const confirmed = confirm("This action will reset all your previous color choices. Are you sure you want to continue?");
      
      if (!confirmed) return;
      
      const selection = document.querySelector("#default-theme-selector").value;
      
      console.log(defaultThemes[selection]);
      
      this.theme.content = defaultThemes[selection];
      
      this.setRoomBoundaryColor();
    },
    
    
    getRandomTheme: function() {
      const properties = Object.keys(this.theme.content);
      
      properties
        .filter(property => property !== 'paletteSize' && property !== 'border' && property !== 'guiblack')
        .forEach(property => {
          this.theme.content[property] = Konva.Util.getRandomColor();
        });
      
      this.setRoomBoundaryColor();
    },
    
    
    switchRoomBoundaryType: function() {
      if (this.theme.content.guiblack === "#000000" || this.theme.content.guiblack.toLowerCase() === "black")
        {
          this.theme.content.guiblack = "#FFFFFF";
        }
      else {
        this.theme.content.guiblack = "#000000";
      }
      
      this.setRoomBoundaryColor();
      document.querySelector("#roomBoundaryBtn").innerText = "Change Room Boundary";
    },
    
    
    // make the map boundary darker/lighter than the map's bg color
    setRoomBoundaryColor: function() {      
      let mapBG = tinycolor(this.theme.content.white);
      
      if (this.theme.content.guiblack === "#000000" || this.theme.content.guiblack.toLowerCase() === "black")
        {
          this.roomBoundaryColor = mapBG.darken(10).toString();
        }
      else {
        this.roomBoundaryColor = mapBG.brighten(10).toString();
      }
    },
    
    
    importTheme: function() {
      
      let input = prompt("Please enter the theme you wish to import. Note that it must be of the same format used by this theme maker, and cannot look similar to the following format: \n\n RW50ZXIgWW91ciBUaGVtZSBOYW1lIEhlcmUAAIB627y56H7niW3984C1jv3vmcPo6/eqn57/JgBISEg8pMuKvD/gPkHvx0uNat//JgCnp69yb29OjwAAAAA \n\n");
       
      input = JSON.parse(input);
      
      for (let property in (this.theme.content)) {
        this.theme.content[property] = input.content[property];
      }
      
    },
    
  },
});










const defaultThemes = {
    "normal": {
        "teal": "#7ADBBC", 
        "lgreen": "#B9E87E", 
        "orange": "#E7896D", 
        "yellow": "#FDF380", 
        "lavender": "#B58EFD", 
        "pink": "#EF99C3",
        "vlgrey": "#E8EBF7", 
        "lgrey": "#AA9F9E",
        "guiwhite": "#FFFFFF",
        "black": "#484848",
        "blue": "#3CA4CB",
        "green": "#8ABC3F",
        "red": "#E03E41",
        "gold": "#EFC74B",
        "purple": "#8D6ADF",
        "magenta": "#CC669C", 
        "grey": "#A7A7AF",
        "dgrey": "#726F6F",
        "white": "#DBDBDB",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "classic": {
        "teal": "#8EFFFB", 
        "lgreen": "#85E37D", 
        "orange": "#FC7676", 
        "yellow": "#FFEB8E", 
        "lavender": "#B58EFF", 
        "pink": "#F177DD",
        "vlgrey": "#CDCDCD", 
        "lgrey": "#999999",
        "guiwhite": "#FFFFFF",
        "black": "#525252",
        "blue": "#00B0E1",
        "green": "#00E06C",
        "red": "#F04F54",
        "gold": "#FFE46B",
        "purple": "#768CFC",
        "magenta": "#BE7FF5", 
        "grey": "#999999",
        "dgrey": "#545454",
        "white": "#C0C0C0",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "dark": {
        "teal": "#8975B7", 
        "lgreen": "#1BA01F", 
        "orange": "#C46748", 
        "yellow": "#B2B224", 
        "lavender": "#7D56C5", 
        "pink": "#B24FAE",
        "vlgrey": "#1E1E1E", 
        "lgrey": "#3C3A3A",
        "guiwhite": "#000000",
        "black": "#E5E5E5",
        "blue": "#379FC6",
        "green": "#30B53B",
        "red": "#FF6C6E",
        "gold": "#FFC665",
        "purple": "#9673E8",
        "magenta": "#C8679B", 
        "grey": "#635F5F",
        "dgrey": "#73747A",
        "white": "#11110F",
        "guiblack": "#FFFFFF",
        "paletteSize": 10,
        "border": 0.5
    },
    "natural": {
        "teal": "#76C1BB", 
        "lgreen": "#AAD35D", 
        "orange": "#E09545", 
        "yellow": "#FFD993", 
        "lavender": "#939FFF", 
        "pink": "#D87FB2",
        "vlgrey": "#C4B6B6", 
        "lgrey": "#7F7F7F",
        "guiwhite": "#FFFFFF",
        "black": "#373834",
        "blue": "#4F93B5",
        "green": "#00B659",
        "red": "#E14F65",
        "gold": "#E5BF42",
        "purple": "#8053A0",
        "magenta": "#B67CAA", 
        "grey": "#998F8F",
        "dgrey": "#494954",
        "white": "#A5B2A5",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "forest": {
        "teal": "#884AA5", 
        "lgreen": "#8C9B3E", 
        "orange": "#D16A80", 
        "yellow": "#97596D", 
        "lavender": "#499855", 
        "pink": "#60294F",
        "vlgrey": "#DDC6B8", 
        "lgrey": "#7E949E",
        "guiwhite": "#FFFFE8",
        "black": "#665750",
        "blue": "#807BB6",
        "green": "#A1BE55",
        "red": "#E5B05B",
        "gold": "#FF4747",
        "purple": "#BAC674",
        "magenta": "#BA78D1", 
        "grey": "#998866",
        "dgrey": "#529758",
        "white": "#7DA060",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "midnight": {
        "teal": "#2B9098", 
        "lgreen": "#4BAA5D", 
        "orange": "#345678", 
        "yellow": "#CDC684", 
        "lavender": "#89778E", 
        "pink": "#A85C90",
        "vlgrey": "#CCCCCC", 
        "lgrey": "#A7B2B7",
        "guiwhite": "#BAC6FF",
        "black": "#091F28",
        "blue": "#123455",
        "green": "#098765",
        "red": "#000013",
        "gold": "#566381",
        "purple": "#743784",
        "magenta": "#B29098", 
        "grey": "#555555",
        "dgrey": "#649EB7",
        "white": "#444444",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "pastel": {
        "teal": "#89BFBA", 
        "lgreen": "#B5D17D", 
        "orange": "#E5E0E0", 
        "yellow": "#B5BBE5", 
        "lavender": "#939FFF", 
        "pink": "#646DE5",
        "vlgrey": "#B2B2B2", 
        "lgrey": "#7F7F7F",
        "guiwhite": "#FFFFFF",
        "black": "#383835",
        "blue": "#AEAEFF",
        "green": "#AEFFAE",
        "red": "#FFAEAE",
        "gold": "#FFFFFF",
        "purple": "#C3C3D8",
        "magenta": "#FFB5FF", 
        "grey": "#CCCCCC",
        "dgrey": "#A0A0B2",
        "white": "#F2F2F2",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "space": {
        "teal": "#4788F3", 
        "lgreen": "#AF1010", 
        "orange": "#FF0000", 
        "yellow": "#82F850", 
        "lavender": "#FFFFFF", 
        "pink": "#57006C",
        "vlgrey": "#FFFFFF", 
        "lgrey": "#272727",
        "guiwhite": "#000000",
        "black": "#7F7F7F",
        "blue": "#0E1B92",
        "green": "#0AEB80",
        "red": "#C2B90A",
        "gold": "#3E7E8C",
        "purple": "#285911",
        "magenta": "#A9707E", 
        "grey": "#6F6A68",
        "dgrey": "#2D0738",
        "white": "#000000",
        "guiblack": "#FFFFFF",
        "paletteSize": 10,
        "border": 0.5
    },
    "nebula": {
        "teal": "#38B06E", 
        "lgreen": "#22882E", 
        "orange": "#D28E7F", 
        "yellow": "#D5D879", 
        "lavender": "#E084EB", 
        "pink": "#DF3E3E",
        "vlgrey": "#F0F2CC", 
        "lgrey": "#7D7D7D",
        "guiwhite": "#C2C5EF",
        "black": "#161616",
        "blue": "#9274E6",
        "green": "#89F470",
        "red": "#E08E5D",
        "gold": "#ECDC58",
        "purple": "#58CBEC",
        "magenta": "#EA58EC", 
        "grey": "#7E5713",
        "dgrey": "#303030",
        "white": "#555555",
        "guiblack": "#FFFFFF",
        "paletteSize": 10,
        "border": 0.5
    },
    "bleach": {
        "teal": "#00FFFF", 
        "lgreen": "#00FF00", 
        "orange": "#FF3200", 
        "yellow": "#FFEC00", 
        "lavender": "#FF24A7", 
        "pink": "#FF3CBD",
        "vlgrey": "#FFF186", 
        "lgrey": "#918181",
        "guiwhite": "#F1F1F1",
        "black": "#5F5F5F",
        "blue": "#0025FF",
        "green": "#00FF00",
        "red": "#FF0000",
        "gold": "#FFFA23",
        "purple": "#3100FF",
        "magenta": "#D4D3D3", 
        "grey": "#838383",
        "dgrey": "#4C4C4C",
        "white": "#FFFEFE",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "ocean": {
        "teal": "#76EEC6", 
        "lgreen": "#41AA78", 
        "orange": "#FF7F50", 
        "yellow": "#FFD250", 
        "lavender": "#DC3388", 
        "pink": "#FA8072",
        "vlgrey": "#8B8886", 
        "lgrey": "#BFC1C2",
        "guiwhite": "#FFFFFF",
        "black": "#12466B",
        "blue": "#4200AE",
        "green": "#0D6338",
        "red": "#DC4333",
        "gold": "#FEA904",
        "purple": "#7B4BAB",
        "magenta": "#5C246E", 
        "grey": "#656884",
        "dgrey": "#D4D7D9",
        "white": "#3283BC",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
    },
    "badlands": {
        "teal": "#F9CB9C", 
        "lgreen": "#F1C232", 
        "orange": "#38761D", 
        "yellow": "#E69138", 
        "lavender": "#B7B7B7", 
        "pink": "#78866B",
        "vlgrey": "#6AA84F", 
        "lgrey": "#B7B7B7",
        "guiwhite": "#A4C2F4",
        "black": "#000000",
        "blue": "#0C5A9E",
        "green": "#6E8922",
        "red": "#5B0000",
        "gold": "#783F04",
        "purple": "#591C77",
        "magenta": "#20124D", 
        "grey": "#2F1C16",
        "dgrey": "#999999",
        "white": "#543517",
        "guiblack": "#FFFFFF",
        "paletteSize": 10,
        "border": 0.5
    },
    "pumpkin": { 
      "teal": "#721970",
      "lgreen": "#ff6347",
      "orange": "#1b713a",
      "yellow": "#fdf380",
      "lavender": "#941100",
      "pink": "#194417",
      "vlgrey": "#1b713a",
      "lgrey": "#aa9f9e",
      "guiwhite": "#fed8b1",
      "black": "#484848",
      "blue": "#3ca4cb",
      "green": "#76EEC6",
      "red": "#F04F54",
      "gold": "#1b713a",
      "purple": "#1b713a",
      "magenta": "#cc669c",
      "grey": "#ffffff",
      "dgrey": "#726f6f",
      "white": "#ff9b58",
      "guiblack": "#000000",
      "paletteSize": 10,
      "border": "3.3" // its supposed to be in quotes
    },
  
    "desert": {
       "teal": "#783B31",
        "lgreen": "#F5DEB3",
        "orange": "#E17D70",
        "yellow": "#DFAB79",
        "lavender": "#B9A9BB",
        "pink": "#C1938E",
        "vlgrey": "#A88E80",
        "lgrey": "#CCB78E",
        "guiwhite": "#ffffff",
        "black": "#555555",
        "blue": "#007BA7",
        "green": "#2E8B57",
        "red": "#E44D2E",
        "gold": "#DDCF70",
        "purple": "#5B968F",
        "magenta": "#856088",
        "grey": "#989B9D",
        "dgrey": "#9E8171",
        "white": "#CEB385",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border":  0.5
    },
  
    "eggplant": {
       "teal": "#E96BA8",
        "lgreen": "#78D4B6",
        "orange": "#D6100F",
        "yellow": "#A39E9B",
        "lavender": "#E7E9DB",
        "pink": "#E96BA8",
        "vlgrey": "#8D8687",
        "lgrey": "#2B1A29",
        "guiwhite": "#ffffff",
        "black": "#2B1A29",
        "blue": "#06B6EF",
        "green": "#48B685",
        "red": "#EF6155",
        "gold": "#F99B15",
        "purple": "#815BA4",
        "magenta": "#FEC418",
        "grey": "#B9B6B0",
        "dgrey": "#40113F",
        "white": "#50374D",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
   },
  
   "solarized": {
       "teal": "#B58900",
        "lgreen": "#2AA198",
        "orange": "#CB4B16",
        "yellow": "#657B83",
        "lavender": "#EEE8D5",
        "pink": "#D33682",
        "vlgrey": "#E0E2E4",
        "lgrey": "#073642",
        "guiwhite": "#ffffff",
        "black": "#000000",
        "blue": "#268BD2",
        "green": "#869600",
        "red": "#DC322F",
        "gold": "#B58900",
        "purple": "#678CB1",
        "magenta": "#A082BD",
        "grey": "#839496",
        "dgrey": "#073642",
        "white": "#002B36",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
   }
      
};
