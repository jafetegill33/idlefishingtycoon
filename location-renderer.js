import { CONFIG } from './config.js';

// Canvas location renderer
export class LocationRenderer {
  constructor() {
    this.canvasCache = {};
  }

  // Get canvas for a specific location
  getLocationCanvas(locationId) {
    // Return from cache if already rendered
    if (this.canvasCache[locationId]) {
      return this.canvasCache[locationId];
    }

    // Create a new canvas for the location
    const canvas = document.createElement('canvas');
    canvas.width = CONFIG.locationCanvas.width;
    canvas.height = CONFIG.locationCanvas.height;
    const ctx = canvas.getContext('2d');
    
    // Render location based on ID
    switch(locationId) {
      case 'pond':
        this.renderPond(ctx, canvas.width, canvas.height);
        break;
      case 'lake':
        this.renderLake(ctx, canvas.width, canvas.height);
        break;
      case 'river':
        this.renderRiver(ctx, canvas.width, canvas.height);
        break;
      case 'ocean':
        this.renderOcean(ctx, canvas.width, canvas.height);
        break;
      default:
        this.renderPond(ctx, canvas.width, canvas.height);
    }
    
    // Cache the rendered canvas
    this.canvasCache[locationId] = canvas.toDataURL('image/png');
    return this.canvasCache[locationId];
  }
  
  // Render the local pond location
  renderPond(ctx, width, height) {
    // Sky gradient background
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGradient.addColorStop(0, '#81d4fa');
    skyGradient.addColorStop(1, '#4fc3f7');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.6);
    
    // Water
    const waterGradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
    waterGradient.addColorStop(0, '#29b6f6');
    waterGradient.addColorStop(1, '#0288d1');
    ctx.fillStyle = waterGradient;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
    
    // Draw hills
    ctx.fillStyle = '#66bb6a';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.bezierCurveTo(width * 0.2, height * 0.5, width * 0.3, height * 0.55, width * 0.5, height * 0.6);
    ctx.bezierCurveTo(width * 0.65, height * 0.65, width * 0.8, height * 0.5, width, height * 0.6);
    ctx.lineTo(width, height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Draw trees
    this.drawTree(ctx, width * 0.1, height * 0.55, height * 0.15);
    this.drawTree(ctx, width * 0.25, height * 0.53, height * 0.12);
    this.drawTree(ctx, width * 0.7, height * 0.57, height * 0.13);
    this.drawTree(ctx, width * 0.85, height * 0.55, height * 0.14);
    
    // Draw lily pads
    this.drawLilyPad(ctx, width * 0.3, height * 0.7, 10);
    this.drawLilyPad(ctx, width * 0.5, height * 0.75, 8);
    this.drawLilyPad(ctx, width * 0.7, height * 0.8, 12);
    
    // Draw cattails
    this.drawCattail(ctx, width * 0.15, height * 0.65, height * 0.1);
    this.drawCattail(ctx, width * 0.18, height * 0.63, height * 0.08);
    this.drawCattail(ctx, width * 0.8, height * 0.67, height * 0.09);
    this.drawCattail(ctx, width * 0.83, height * 0.65, height * 0.11);
    
    // Draw small pier
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(width * 0.4, height * 0.6, width * 0.2, height * 0.05);
    
    // Draw sun
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.2, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw clouds
    this.drawCloud(ctx, width * 0.2, height * 0.25, 20);
    this.drawCloud(ctx, width * 0.5, height * 0.15, 25);
    this.drawCloud(ctx, width * 0.7, height * 0.3, 15);
  }
  
  // Render the mountain lake location
  renderLake(ctx, width, height) {
    // Sky gradient background
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGradient.addColorStop(0, '#80cbc4');
    skyGradient.addColorStop(1, '#4db6ac');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.6);
    
    // Water
    const waterGradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
    waterGradient.addColorStop(0, '#26a69a');
    waterGradient.addColorStop(1, '#00796b');
    ctx.fillStyle = waterGradient;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
    
    // Draw mountains
    ctx.fillStyle = '#607d8b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.lineTo(width * 0.2, height * 0.3);
    ctx.lineTo(width * 0.35, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.7, height * 0.4);
    ctx.lineTo(width * 0.85, height * 0.3);
    ctx.lineTo(width, height * 0.5);
    ctx.lineTo(width, height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Snow caps
    ctx.fillStyle = '#eceff1';
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.35);
    ctx.lineTo(width * 0.2, height * 0.3);
    ctx.lineTo(width * 0.25, height * 0.35);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(width * 0.45, height * 0.25);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.55, height * 0.25);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(width * 0.8, height * 0.35);
    ctx.lineTo(width * 0.85, height * 0.3);
    ctx.lineTo(width * 0.9, height * 0.35);
    ctx.closePath();
    ctx.fill();
    
    // Draw pine trees
    for (let i = 0; i < 8; i++) {
      this.drawPineTree(ctx, width * (0.1 + i * 0.1), height * 0.58, height * 0.1);
    }
    
    // Draw small boat on lake
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.ellipse(width * 0.6, height * 0.7, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw fishing person in boat
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(width * 0.58, height * 0.65, 4, 10);
    ctx.fillStyle = '#c62828';
    ctx.beginPath();
    ctx.arc(width * 0.6, height * 0.63, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw fishing rod
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.6, height * 0.65);
    ctx.lineTo(width * 0.65, height * 0.55);
    ctx.lineTo(width * 0.63, height * 0.75);
    ctx.stroke();
    
    // Draw clouds
    this.drawCloud(ctx, width * 0.2, height * 0.2, 15);
    this.drawCloud(ctx, width * 0.5, height * 0.15, 20);
    this.drawCloud(ctx, width * 0.8, height * 0.25, 18);
  }
  
  // Render the rushing river location
  renderRiver(ctx, width, height) {
    // Sky gradient background
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.5);
    skyGradient.addColorStop(0, '#64b5f6');
    skyGradient.addColorStop(1, '#42a5f5');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.5);
    
    // Land
    ctx.fillStyle = '#689f38';
    ctx.fillRect(0, height * 0.5, width, height * 0.5);
    
    // River
    ctx.fillStyle = '#1976d2';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.bezierCurveTo(width * 0.3, height * 0.5, width * 0.6, height * 0.7, width, height * 0.55);
    ctx.lineTo(width, height * 0.8);
    ctx.bezierCurveTo(width * 0.7, height * 0.9, width * 0.3, height * 0.75, 0, height * 0.85);
    ctx.closePath();
    ctx.fill();
    
    // River highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.63);
    ctx.bezierCurveTo(width * 0.2, height * 0.6, width * 0.3, height * 0.65, width * 0.4, height * 0.62);
    ctx.bezierCurveTo(width * 0.5, height * 0.6, width * 0.6, height * 0.65, width * 0.7, height * 0.63);
    ctx.bezierCurveTo(width * 0.8, height * 0.6, width * 0.9, height * 0.65, width, height * 0.62);
    ctx.bezierCurveTo(width * 0.9, height * 0.68, width * 0.8, height * 0.64, width * 0.7, height * 0.67);
    ctx.bezierCurveTo(width * 0.6, height * 0.7, width * 0.5, height * 0.65, width * 0.4, height * 0.68);
    ctx.bezierCurveTo(width * 0.3, height * 0.7, width * 0.2, height * 0.65, width * 0.1, height * 0.67);
    ctx.closePath();
    ctx.fill();
    
    // Draw trees
    this.drawTree(ctx, width * 0.1, height * 0.48, height * 0.15);
    this.drawTree(ctx, width * 0.8, height * 0.45, height * 0.18);
    
    // Draw rocks
    this.drawRock(ctx, width * 0.2, height * 0.65, 10);
    this.drawRock(ctx, width * 0.25, height * 0.67, 8);
    this.drawRock(ctx, width * 0.7, height * 0.6, 12);
    this.drawRock(ctx, width * 0.75, height * 0.63, 7);
    
    // Draw small bridge
    ctx.fillStyle = '#795548';
    ctx.fillRect(width * 0.4, height * 0.5, width * 0.2, height * 0.05);
    ctx.fillRect(width * 0.45, height * 0.4, width * 0.1, height * 0.1);
    ctx.fillRect(width * 0.43, height * 0.4, width * 0.14, height * 0.02);
    
    // Draw sun
    ctx.fillStyle = '#ffd54f';
    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.2, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw clouds
    this.drawCloud(ctx, width * 0.4, height * 0.15, 18);
    this.drawCloud(ctx, width * 0.7, height * 0.25, 22);
  }
  
  // Render the deep ocean location
  renderOcean(ctx, width, height) {
    // Sky gradient background
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.5);
    skyGradient.addColorStop(0, '#0277bd');
    skyGradient.addColorStop(1, '#01579b');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.5);
    
    // Deep ocean
    const oceanGradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
    oceanGradient.addColorStop(0, '#01579b');
    oceanGradient.addColorStop(1, '#002f6c');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, height * 0.5, width, height * 0.5);
    
    // Distant island
    ctx.fillStyle = '#33691e';
    ctx.beginPath();
    ctx.ellipse(width * 0.8, height * 0.52, 30, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Palm trees on island
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(width * 0.75, height * 0.45, 3, 10);
    ctx.fillStyle = '#2e7d32';
    ctx.beginPath();
    ctx.moveTo(width * 0.77, height * 0.45);
    ctx.lineTo(width * 0.72, height * 0.42);
    ctx.lineTo(width * 0.77, height * 0.44);
    ctx.lineTo(width * 0.74, height * 0.39);
    ctx.lineTo(width * 0.77, height * 0.43);
    ctx.lineTo(width * 0.8, height * 0.38);
    ctx.lineTo(width * 0.77, height * 0.42);
    ctx.lineTo(width * 0.82, height * 0.4);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(width * 0.83, height * 0.47, 3, 8);
    ctx.fillStyle = '#2e7d32';
    ctx.beginPath();
    ctx.moveTo(width * 0.85, height * 0.47);
    ctx.lineTo(width * 0.8, height * 0.45);
    ctx.lineTo(width * 0.85, height * 0.46);
    ctx.lineTo(width * 0.82, height * 0.42);
    ctx.lineTo(width * 0.85, height * 0.45);
    ctx.lineTo(width * 0.87, height * 0.41);
    ctx.lineTo(width * 0.85, height * 0.44);
    ctx.lineTo(width * 0.9, height * 0.43);
    ctx.closePath();
    ctx.fill();
    
    // Draw fishing boat
    ctx.fillStyle = '#37474f';
    ctx.beginPath();
    ctx.moveTo(width * 0.4, height * 0.6);
    ctx.lineTo(width * 0.3, height * 0.7);
    ctx.lineTo(width * 0.5, height * 0.7);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#546e7a';
    ctx.fillRect(width * 0.35, height * 0.55, width * 0.1, height * 0.05);
    
    // Mast and sail
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(width * 0.4, height * 0.5, 2, height * 0.1);
    ctx.fillStyle = '#eceff1';
    ctx.beginPath();
    ctx.moveTo(width * 0.4, height * 0.5);
    ctx.lineTo(width * 0.45, height * 0.53);
    ctx.lineTo(width * 0.45, height * 0.63);
    ctx.lineTo(width * 0.4, height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Draw waves
    for (let i = 0; i < 5; i++) {
      this.drawWave(ctx, width * 0.1 + i * 0.2, height * 0.65, 10);
    }
    
    // Draw seagulls
    this.drawSeagull(ctx, width * 0.2, height * 0.3, 8);
    this.drawSeagull(ctx, width * 0.3, height * 0.25, 6);
    this.drawSeagull(ctx, width * 0.6, height * 0.35, 7);
    
    // Draw moon
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.2, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw stars
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.4;
      const size = Math.random() * 1.5 + 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Helper methods to draw elements
  drawTree(ctx, x, y, size) {
    // Trunk
    ctx.fillStyle = '#795548';
    ctx.fillRect(x - size/10, y - size, size/5, size);
    
    // Leaves
    ctx.fillStyle = '#43a047';
    ctx.beginPath();
    ctx.arc(x, y - size, size/2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawPineTree(ctx, x, y, size) {
    // Trunk
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(x - size/10, y - size/2, size/5, size/2);
    
    // Triangular top
    ctx.fillStyle = '#2e7d32';
    ctx.beginPath();
    ctx.moveTo(x, y - size * 1.2);
    ctx.lineTo(x - size/2, y - size/2);
    ctx.lineTo(x + size/2, y - size/2);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size/2 * 0.8, y - size/3);
    ctx.lineTo(x + size/2 * 0.8, y - size/3);
    ctx.closePath();
    ctx.fill();
  }
  
  drawLilyPad(ctx, x, y, size) {
    ctx.fillStyle = '#388e3c';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#81c784';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawCattail(ctx, x, y, height) {
    // Stem
    ctx.strokeStyle = '#33691e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - height);
    ctx.stroke();
    
    // Top
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.ellipse(x, y - height, 3, height/5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawRock(ctx, x, y, size) {
    ctx.fillStyle = '#78909c';
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x - size * 0.2, y - size * 0.2, size * 0.4, size * 0.2, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawWave(ctx, x, y, size) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.bezierCurveTo(x - size/2, y - size/2, x + size/2, y - size/2, x + size, y);
    ctx.stroke();
  }
  
  drawCloud(ctx, x, y, size) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y, size * 0.6, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.3, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawSeagull(ctx, x, y, size) {
    ctx.strokeStyle = '#fafafa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.quadraticCurveTo(x, y - size, x + size, y);
    ctx.stroke();
  }
}