<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>🗺️ Portal Planner • Mapa de Posições dos Asuras</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #0a0a2a, #050510);
            min-height: 100vh;
            color: white;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 10px;
            font-size: 2rem;
            background: linear-gradient(135deg, #ff4db8, #44aaff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .subtitle {
            text-align: center;
            color: #aaa;
            margin-bottom: 30px;
        }
        
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .map-container {
            background: rgba(0,0,0,0.5);
            border-radius: 20px;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .map-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .map-header h2 {
            font-size: 1.2rem;
        }
        
        .asura-selector {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .asura-btn {
            background: rgba(255,255,255,0.1);
            border: none;
            padding: 6px 14px;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.8rem;
        }
        
        .asura-btn:hover {
            transform: scale(1.05);
        }
        
        .asura-btn.active {
            background: var(--asura-color);
            color: #000;
            font-weight: bold;
        }
        
        #canvas-map {
            width: 100%;
            height: 500px;
            border-radius: 12px;
            background: #050510;
            cursor: grab;
        }
        
        #canvas-map:active {
            cursor: grabbing;
        }
        
        .controls-panel {
            background: rgba(0,0,0,0.5);
            border-radius: 20px;
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .controls-panel h3 {
            margin-bottom: 15px;
            color: #ffd700;
        }
        
        .position-input {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .position-input input {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            padding: 8px 12px;
            border-radius: 8px;
            color: white;
            width: 80px;
            text-align: center;
        }
        
        .position-input label {
            font-size: 0.8rem;
            color: #aaa;
        }
        
        .add-portal {
            background: #44aaff;
            border: none;
            padding: 10px 20px;
            border-radius: 30px;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
        }
        
        .add-portal:hover {
            transform: scale(1.02);
            background: #66ccff;
        }
        
        .portals-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .portal-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255,255,255,0.05);
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .portal-item:hover {
            background: rgba(255,255,255,0.15);
            transform: translateX(5px);
        }
        
        .portal-item.selected {
            border-left: 3px solid var(--asura-color);
            background: rgba(255,255,255,0.1);
        }
        
        .portal-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .portal-icon {
            font-size: 1.5rem;
        }
        
        .portal-details {
            font-size: 0.8rem;
        }
        
        .portal-name {
            font-weight: bold;
        }
        
        .portal-pos {
            font-size: 0.7rem;
            color: #aaa;
        }
        
        .delete-portal {
            background: rgba(255,0,0,0.3);
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .delete-portal:hover {
            background: rgba(255,0,0,0.6);
        }
        
        .coord-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .coord-preset {
            background: rgba(255,255,255,0.05);
            padding: 6px;
            border-radius: 8px;
            text-align: center;
            font-size: 0.7rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .coord-preset:hover {
            background: rgba(255,255,255,0.15);
            transform: scale(1.02);
        }
        
        .export-import {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .export-btn, .import-btn {
            flex: 1;
            background: #333;
            border: none;
            padding: 8px;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            font-size: 0.8rem;
        }
        
        .export-btn:hover, .import-btn:hover {
            background: #555;
        }
        
        .legend {
            display: flex;
            gap: 20px;
            margin-top: 15px;
            font-size: 0.7rem;
            color: #aaa;
        }
        
        .legend span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 5px;
        }
        
        /* Botão de voltar */
        .back-to-asura {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            padding: 12px 24px;
            border-radius: 30px;
            color: white;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            z-index: 10000;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .back-to-asura:hover {
            background: rgba(0,0,0,0.9);
            transform: scale(1.05);
            border-color: var(--asura-color, #44aaff);
        }
        
        @media (max-width: 900px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Botão de voltar para o mundo da Asura -->
    <button class="back-to-asura" id="backToAsuraBtn">
        ← Voltar para o Mundo da Asura
    </button>
    
    <div class="container">
        <h1>🗺️ PORTAL PLANNER</h1>
        <div class="subtitle">Clique duas vezes em um portal para viajar até o mini-mundo</div>
        
        <div class="dashboard">
            <div class="map-container">
                <div class="map-header">
                    <h2 id="mapTitle">📍 CARREGANDO...</h2>
                    <div class="asura-selector" id="asuraSelector"></div>
                </div>
                <canvas id="canvas-map"></canvas>
                <div class="legend">
                    <div><span style="background: #ff4db8;"></span> Portal Ativo</div>
                    <div><span style="background: #44aaff;"></span> Posição Livre</div>
                    <div><span style="background: #ffaa44;"></span> Portal Selecionado</div>
                    <div><span style="background: #333;"></span> Asura (centro)</div>
                </div>
            </div>
            
            <div class="controls-panel">
                <h3>🎮 Controles</h3>
                
                <div class="position-input">
                    <div>
                        <label>X (direita/esquerda)</label>
                        <input type="number" id="posX" step="0.1" value="1.8">
                    </div>
                    <div>
                        <label>Z (frente/trás)</label>
                        <input type="number" id="posZ" step="0.1" value="1.8">
                    </div>
                    <div>
                        <label>Y (altura)</label>
                        <input type="number" id="posY" step="0.1" value="0.3">
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <input type="text" id="portalName" placeholder="Nome do portal" style="flex:1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; color: white;">
                    <input type="text" id="portalIcon" placeholder="Ícone (ex: 🪐)" value="🚪" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; color: white; text-align: center;">
                </div>
                
                <button class="add-portal" id="addPortalBtn">➕ ADICIONAR PORTAL</button>
                
                <h3>📋 Portais do Asura (clique duplo para viajar)</h3>
                <div class="portals-list" id="portalsList"></div>
                
                <h3>📍 Posições Rápidas</h3>
                <div class="coord-grid">
                    <div class="coord-preset" data-x="1.8" data-z="1.8">↗️ (1.8, 1.8)</div>
                    <div class="coord-preset" data-x="-1.8" data-z="1.8">↖️ (-1.8, 1.8)</div>
                    <div class="coord-preset" data-x="1.8" data-z="-1.8">↘️ (1.8, -1.8)</div>
                    <div class="coord-preset" data-x="-1.8" data-z="-1.8">↙️ (-1.8, -1.8)</div>
                    <div class="coord-preset" data-x="0" data-z="1.5">⬆️ Frente (0, 1.5)</div>
                    <div class="coord-preset" data-x="0" data-z="-1.5">⬇️ Trás (0, -1.5)</div>
                    <div class="coord-preset" data-x="1.2" data-z="0">➡️ Direita (1.2, 0)</div>
                    <div class="coord-preset" data-x="-1.2" data-z="0">⬅️ Esquerda (-1.2, 0)</div>
                    <div class="coord-preset" data-x="0" data-z="0">🎯 Centro (0, 0)</div>
                </div>
                
                <div class="export-import">
                    <button class="export-btn" id="exportBtn">📤 Exportar Config</button>
                    <button class="import-btn" id="importBtn">📥 Importar Config</button>
                </div>
            </div>
        </div>
    </div>

    <script type="importmap">
        {
            "imports": {
                "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
            }
        }
    </script>

    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
        
        // =========================
        // CONFIGURAÇÃO DOS ASURAS
        // =========================
        const asurasConfig = {
            diva: { name: 'DIVA', color: '#ff4db8', glow: '#ff88dd', icon: '🤖' },
            siria: { name: 'SIRIA', color: '#35ff9c', glow: '#00cc66', icon: '🌳' },
            merlim: { name: 'MERLIM', color: '#00d9ff', glow: '#00aaff', icon: '🔧' },
            astreia: { name: 'ASTREIA', color: '#287bff', glow: '#44aaff', icon: '👁️' },
            umbra: { name: 'UMBRA', color: '#8b2fff', glow: '#aa55ff', icon: '🕵️' },
            atena: { name: 'ATENA', color: '#ffd700', glow: '#ffaa33', icon: '🦉' },
            victoria: { name: 'VICTORIA', color: '#ff0000', glow: '#cc0000', icon: '🏅' },
            hestia: { name: 'HESTIA', color: '#fff0b3', glow: '#ffddaa', icon: '🔮' },
            daedala: { name: 'DAEDALA', color: '#00ffd5', glow: '#00ccaa', icon: '⚗️' }
        };
        
        // =========================
        // PORTAIS PADRÃO PARA CADA ASURA - GARANTIDO
        // =========================
        const defaultPortals = {
            diva: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'CINEMA', icon: '🎬', x: -1.8, y: 0.3, z: -1.8 }
            ],
            siria: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'PRAIA', icon: '🏖️', x: -1.8, y: 0.3, z: -1.8 }
            ],
            merlim: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'BIBLIOTECA', icon: '📚', x: -1.8, y: 0.3, z: -1.8 }
            ],
            astreia: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'CIDADE CYBER', icon: '🌆', x: -1.8, y: 0.3, z: -1.8 }
            ],
            umbra: [
                { name: 'BURACO NEGRO', icon: '⚫', x: 1.5, y: 0.3, z: 1.5 },
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.5, y: 0.3, z: -1.5 },
                { name: 'GALÁXIA', icon: '✨', x: -1.5, y: 0.3, z: 1.5 },
                { name: 'TEMPLO DRAGÃO', icon: '🐉', x: -1.5, y: 0.3, z: -1.5 }
            ],
            atena: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'BIBLIOTECA', icon: '📚', x: -1.8, y: 0.3, z: -1.8 }
            ],
            victoria: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'MUSEU DINOSSAURO', icon: '🦕', x: -1.8, y: 0.3, z: -1.8 }
            ],
            hestia: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'TEMPLO DRAGÃO', icon: '🐉', x: -1.8, y: 0.3, z: -1.8 }
            ],
            daedala: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8 },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8 },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8 },
                { name: 'CIDADE CYBER', icon: '🌆', x: -1.8, y: 0.3, z: -1.8 }
            ]
        };
        
        // =========================
        // MAPEAMENTO DOS MINI-MUNDOS - CAMINHOS CORRIGIDOS
        // =========================
        function getMiniMundoPath(portalName) {
            // Caminho relativo: de shared/portals/ para mini-mundos/
            const basePath = '../../mini-mundos/global/';
            const exclusivePath = '../../mini-mundos/exclusive/';
            
            const map = {
                'SISTEMA SOLAR': basePath + 'sistema_solar/index.html',
                'TERRA': basePath + 'earth/index.html',
                'GALÁXIA': basePath + 'galaxy_animation/index.html',
                'CINEMA': basePath + 'planner/index.html',
                'PRAIA': basePath + 'beach/index.html',
                'BEACH': basePath + 'beach/index.html',
                'CIDADE CYBER': basePath + 'cybercity/index.html',
                'CYBERCITY': basePath + 'cybercity/index.html',
                'MUSEU DINOSSAURO': basePath + 'dinomuseum/index.html',
                'DINOMUSEUM': basePath + 'dinomuseum/index.html',
                'TEMPLO DRAGÃO': basePath + 'dragon-temple/index.html',
                'DRAGON TEMPLE': basePath + 'dragon-temple/index.html',
                'BIBLIOTECA': basePath + 'library/index.html',
                'LIBRARY': basePath + 'library/index.html',
                'BURACO NEGRO': exclusivePath + 'umbra/buraco_negro/index.html'
            };
            
            const path = map[portalName.toUpperCase()];
            console.log(`🔍 Mini-mundo: ${portalName} -> ${path}`);
            return path || null;
        }
        
        // =========================
        // NAVEGAÇÃO PARA MINI-MUNDOS
        // =========================
        let isRedirecting = false;
        
        function openMiniMundo(portalName, portalIcon, portalX, portalZ) {
            if (isRedirecting) return;
            
            const caminho = getMiniMundoPath(portalName);
            
            if (!caminho) {
                alert(`🌌 "${portalName}"\n\nMini-mundo em construção! Em breve você poderá viajar para este destino.`);
                return;
            }
            
            console.log(`🚪 Abrindo portal: ${portalName} -> ${caminho}`);
            
            // Salvar no localStorage qual Asura está chamando
            localStorage.setItem('lastAsura', currentAsura);
            localStorage.setItem('lastPortal', portalName);
            
            isRedirecting = true;
            
            // Efeito de transição
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: radial-gradient(circle, ${asurasConfig[currentAsura].color}, transparent);
                opacity: 0;
                transition: opacity 0.6s ease;
                z-index: 99999;
                pointer-events: none;
            `;
            document.body.appendChild(overlay);
            
            requestAnimationFrame(() => {
                overlay.style.opacity = '0.8';
                setTimeout(() => {
                    window.location.href = caminho;
                }, 500);
            });
        }
        
        // =========================
        // ESTADO ATUAL
        // =========================
        let currentAsura = 'merlim';
        let portals = [];
        let selectedPortalIndex = -1;
        
        // =========================
        // SETUP THREE.JS
        // =========================
        const container = document.getElementById('canvas-map');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050510);
        
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 4, 6);
        camera.lookAt(0, 0, 0);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.left = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        container.appendChild(labelRenderer.domElement);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.zoomSpeed = 1.2;
        controls.rotateSpeed = 1.0;
        controls.enablePan = true;
        
        // Elementos da cena
        const gridHelper = new THREE.GridHelper(8, 20, 0x4488ff, 0x333366);
        gridHelper.position.y = -0.2;
        scene.add(gridHelper);
        
        const centerCircle = new THREE.Mesh(
            new THREE.CircleGeometry(0.5, 32),
            new THREE.MeshStandardMaterial({ color: 0xffaa44, emissive: 0xff4400, emissiveIntensity: 0.3, side: THREE.DoubleSide })
        );
        centerCircle.rotation.x = -Math.PI / 2;
        centerCircle.position.y = -0.19;
        scene.add(centerCircle);
        
        const asuraGroup = new THREE.Group();
        const asuraBody = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffaa44, emissive: 0xff6600, emissiveIntensity: 0.2 }));
        asuraGroup.add(asuraBody);
        const asuraEyes = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 }));
        asuraEyes.position.set(0.15, 0.1, 0.35);
        asuraGroup.add(asuraEyes);
        const asuraEyes2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 }));
        asuraEyes2.position.set(-0.15, 0.1, 0.35);
        asuraGroup.add(asuraEyes2);
        asuraGroup.position.set(0, 0, 0);
        scene.add(asuraGroup);
        
        const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 64, 200);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x44aaff, transparent: true, opacity: 0.3 });
        const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
        orbitRing1.rotation.x = Math.PI / 2;
        scene.add(orbitRing1);
        
        const ringGeo2 = new THREE.TorusGeometry(1.8, 0.02, 64, 200);
        const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat);
        orbitRing2.rotation.x = Math.PI / 2;
        scene.add(orbitRing2);
        
        const axesHelper = new THREE.AxesHelper(2.5);
        axesHelper.material.transparent = true;
        axesHelper.material.opacity = 0.15;
        scene.add(axesHelper);
        
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(2, 5, 3);
        scene.add(mainLight);
        const fillLight = new THREE.PointLight(0x4488ff, 0.5);
        fillLight.position.set(0, 2, 0);
        scene.add(fillLight);
        
        const portalMeshes = [];
        const portalLabels = [];
        
        function updatePortalColors() {
            const asuraColor = asurasConfig[currentAsura].color;
            portalMeshes.forEach((mesh, idx) => {
                const colorHex = idx === selectedPortalIndex ? '#ffaa44' : asuraColor;
                mesh.traverse(child => {
                    if (child.isMesh && child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(mat => mat.color.setStyle(colorHex));
                        } else {
                            child.material.color.setStyle(colorHex);
                        }
                    }
                });
            });
        }
        
        function createPortalMesh(x, z, y, name, icon, isSelected = false) {
            const group = new THREE.Group();
            const asuraColor = asurasConfig[currentAsura].color;
            const colorHex = isSelected ? '#ffaa44' : asuraColor;
            
            const geometry = new THREE.TorusGeometry(0.35, 0.05, 32, 64);
            const material = new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.6, metalness: 0.8 });
            const ring = new THREE.Mesh(geometry, material);
            group.add(ring);
            
            const outerGeo = new THREE.TorusGeometry(0.42, 0.03, 32, 64);
            const outerMat = new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.3, transparent: true });
            const outerRing = new THREE.Mesh(outerGeo, outerMat);
            group.add(outerRing);
            
            const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
            const sphereMat = new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.8 });
            const sphere = new THREE.Mesh(sphereGeo, sphereMat);
            group.add(sphere);
            
            group.position.set(x, y, z);
            group.userData = { name, icon, x, z, y };
            
            return group;
        }
        
        function createLabel(name, icon, x, z, y) {
            const div = document.createElement('div');
            div.textContent = `${icon} ${name}`;
            div.style.color = '#fff';
            div.style.fontSize = '12px';
            div.style.fontWeight = 'bold';
            div.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
            div.style.backgroundColor = 'rgba(0,0,0,0.6)';
            div.style.padding = '2px 8px';
            div.style.borderRadius = '20px';
            div.style.border = `1px solid ${asurasConfig[currentAsura].color}`;
            div.style.whiteSpace = 'nowrap';
            div.style.cursor = 'pointer';
            
            const label = new CSS2DObject(div);
            label.position.set(x, y + 0.5, z);
            label.userData = { name, icon, x, z, y };
            
            div.onclick = (e) => {
                e.stopPropagation();
                openMiniMundo(name, icon, x, z);
            };
            
            return label;
        }
        
        function rebuildPortals() {
            // Remover portais antigos
            portalMeshes.forEach(portal => scene.remove(portal));
            portalMeshes.length = 0;
            
            portalLabels.forEach(label => scene.remove(label));
            portalLabels.length = 0;
            
            // Criar novos portais
            portals.forEach((portal, idx) => {
                const portalMesh = createPortalMesh(portal.x, portal.z, portal.y || 0.3, portal.name, portal.icon, idx === selectedPortalIndex);
                scene.add(portalMesh);
                portalMeshes.push(portalMesh);
                
                const label = createLabel(portal.name, portal.icon, portal.x, portal.z, portal.y || 0.3);
                scene.add(label);
                portalLabels.push(label);
            });
            
            updatePortalsList();
            updatePortalColors();
            
            console.log(`🎯 Renderizados ${portals.length} portais para ${currentAsura}`);
        }
        
        function updatePortalsList() {
            const list = document.getElementById('portalsList');
            if (portals.length === 0) {
                list.innerHTML = '<div style="text-align:center; padding:20px; color:#aaa;">Nenhum portal. Adicione um!</div>';
                return;
            }
            
            list.innerHTML = portals.map((portal, idx) => `
                <div class="portal-item ${idx === selectedPortalIndex ? 'selected' : ''}" data-index="${idx}">
                    <div class="portal-info">
                        <span class="portal-icon">${portal.icon}</span>
                        <div class="portal-details">
                            <div class="portal-name">${portal.name}</div>
                            <div class="portal-pos">x: ${portal.x}, z: ${portal.z}</div>
                        </div>
                    </div>
                    <button class="delete-portal" data-index="${idx}">🗑️</button>
                </div>
            `).join('');
            
            document.querySelectorAll('.portal-item').forEach(el => {
                el.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-portal')) return;
                    const idx = parseInt(el.dataset.index);
                    selectedPortalIndex = idx;
                    updatePortalsList();
                    rebuildPortals();
                });
                
                el.addEventListener('dblclick', (e) => {
                    if (e.target.classList.contains('delete-portal'))