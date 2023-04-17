document.addEventListener('DOMContentLoaded', function() {
const colorSelect = document.getElementById('color')
const generateBtn = document.getElementById('generate-button')
const colorSchemeSelect = document.getElementById('color-scheme');


generateBtn.addEventListener('click', function generateColors(){
    
    let color = ''
    color = colorSelect.value.replace(/\D/g, "");
    console.log(color)
    let selectedScheme = colorSchemeSelect.value;
    let colorUrl = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${selectedScheme}`
    
    fetch(colorUrl, {method:'GET'})
        .then(res => res.json()) // convert response to JSON
        .then(data => {
            const colors = data.colors.map(color => color.hex.value); // extract hex values from response
            const colorPalette = document.getElementById('color-palette');
            colorPalette.innerHTML = ''; // clear any previous colors
            colors.forEach(hex => {
                const colorBox = document.createElement('div');
                colorBox.style.backgroundColor = hex;
                colorBox.className = 'color-box';
                colorPalette.appendChild(colorBox);

                const hexValue = document.createElement('div');
                hexValue.innerHTML = hex;
                hexValue.className = 'hex-value';
                colorBox.appendChild(hexValue);
            });
        });
});


const schemeModes = [
  { mode: 'monochrome', label: 'Monochrome' },
  { mode: 'monochrome-dark', label: 'Monochrome (Dark)' },
  { mode: 'monochrome-light', label: 'Monochrome (Light)' },
  { mode: 'analogic', label: 'Analogous' },
  { mode: 'complement', label: 'Complementary' },
  { mode: 'analogic-complement', label: 'Analogous (Complementary)' },
  { mode: 'triad', label: 'Triadic' },
  { mode: 'quad', label: 'Tetradic (Double Complementary)' }
];

schemeModes.forEach(scheme => {
  const option = document.createElement('option');
  option.value = scheme.mode;
  option.text = scheme.label;
  colorSchemeSelect.appendChild(option);
});
});