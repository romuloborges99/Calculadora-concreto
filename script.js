document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const largura = parseFloat(document.getElementById("largura").value);
    const comprimento = parseFloat(document.getElementById("comprimento").value);
    const espessuraCm = parseFloat(document.getElementById("espessura").value);
    const tipoLaje = document.getElementById("tipoLaje").value;
    const perda = parseFloat(document.getElementById("perda").value);
    const precoM3 = parseFloat(document.getElementById("precoM3").value);
    const resultadoEl = document.getElementById("resultado");
  
    // Validação básica
    if ([largura, comprimento, espessuraCm, perda].some(v => isNaN(v) || v <= 0)) {
      resultadoEl.textContent = "Por favor, preencha todos os campos obrigatórios corretamente.";
      resultadoEl.style.color = "red";
      return;
    }
  
    const area = largura * comprimento;
    let espessuraUtilizada;
    let volume;
  
    if (tipoLaje === "macica") {
      espessuraUtilizada = espessuraCm / 100;
      volume = area * espessuraUtilizada;
    } else if (tipoLaje === "nervurada") {
      espessuraUtilizada = (espessuraCm / 100) * 0.7;
      volume = area * espessuraUtilizada;
    } else if (tipoLaje === "isopor") {
      const alturaEPS = 7;
      if (espessuraCm <= alturaEPS) 
    
      espessuraUtilizada = espessuraCm  / 100;
      volume = area * espessuraUtilizada;
    }
  
    const volumeFinal = volume * (1 + perda / 100);
  
    let custoTotal = null;
    if (!isNaN(precoM3) && precoM3 > 0) {
      custoTotal = precoM3 * volumeFinal;
    }
  
    resultadoEl.style.color = "var(--success)";
    resultadoEl.innerHTML = `
      <p><strong>Área total:</strong> ${area.toFixed(2)} m²</p>
      <p><strong>Espessura considerada:</strong> ${espessuraUtilizada.toFixed(2)} m</p>
      <p><strong>Tipo de laje:</strong> ${tipoLaje.charAt(0).toUpperCase() + tipoLaje.slice(1)}</p>
      <p><strong>Volume estimado de concreto (com ${perda}% de perda):</strong> ${volumeFinal.toFixed(2)} m³</p>
      ${
        custoTotal !== null
          ? `<p><strong>Custo estimado:</strong> R$ ${custoTotal.toFixed(2)}</p>`
          : ""
      }
    `;
  });
  