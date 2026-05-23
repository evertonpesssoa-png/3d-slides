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
        
        /* Mapa 3D */
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
            color: var(--asura-color);
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
        
        /* Painel de controles */
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
        
        @media (max-width: 900px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗺️ PORTAL PLANNER</h1>
        <div class="subtitle">Planeje a posição dos portais ao redor de cada Asura</div>
        
        <div class="dashboard">
            <!-- Mapa 3D -->
            <div class="map-container">
                <div class="map-header">
                    <h2 id="mapTitle">📍 DIVA - Posição dos Portais</h2>
                    <div class="asura-selector" id="asuraSelector"></div>
                </div>
                <canvas id="canvas-map"></canvas>
                <div class="legend">
                    <div><span style="background: #ff4db8;"></span> Portal Ativo</div>
                    <div><span style="background: #44aaff;"></span> Posição Livre (clique)</div>
                    <div><span style="background: #ffaa44;"></span> Portal Selecionado</div>
                    <div><span style="background: #333; width: 12px; height: 12px; border-radius: 2px;"></span> Asura (centro)</div>
                </div>
            </div>
            
            <!-- Painel de Controles -->
            <div class="controls-panel">
                <h3>🎮 Controles</h3>
                
                <div class="position-input">
                    <div>
                        <label>X (direita/esquerda)</label>
                        <input type="number" id="posX" step="0.1" value="0">
                    </div>
                    <div>
                        <label>Z (frente/trás)</label>
                        <input type="number" id="posZ" step="0.1" value="0">
                    </div>
                    <div>
                        <label>Y (altura)</label>
                        <input type="number" id="posY" step="0.1" value="0.3">
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <input type="text" id="portalName" placeholder="Nome do portal" style="flex:1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; color: white;">
                    <input type="text" id="portalIcon" placeholder="Ícone (ex: 🪐)" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; color: white; text-align: center;">
                </div>
                
                <button class="add-portal" id="addPortalBtn">➕ ADICIONAR PORTAL</button>
                
                <h3>📋 Portais do Asura</h3>
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
        
        // Portais padrão para cada Asura
        const defaultPortals = {
            diva: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' },
                { name: 'CINEMA', icon: '🎬', x: -1.8, y: 0.3, z: -1.8, description: 'Assista filmes' }
            ],
            siria: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ],
            astreia: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' },
                { name: 'CÂMERAS', icon: '📷', x: 1.2, y: 0.3, z: 0, description: 'Vigilância' },
                { name: 'SENSORES', icon: '🔒', x: -1.2, y: 0.3, z: 0, description: 'Monitoramento' }
            ],
            merlim: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ],
            umbra: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ],
            atena: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ],
            victoria: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ],
            hestia: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ],
            daedala: [
                { name: 'SISTEMA SOLAR', icon: '🪐', x: 1.8, y: 0.3, z: 1.8, description: 'Explore os planetas' },
                { name: 'TERRA', icon: '🌍', x: 1.8, y: 0.3, z: -1.8, description: 'Veja a Terra' },
                { name: 'GALÁXIA', icon: '✨', x: -1.8, y: 0.3, z: 1.8, description: 'Viaje pela galáxia' }
            ]
        };
        
        // Estado atual
        let currentAsura = 'diva';
        let portals = JSON.parse(JSON.stringify(defaultPortals[currentAsura]));
        let selectedPortalIndex = -1;
        
        // Setup Three.js
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
        
        // CSS2DRenderer para texto
        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.left = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        container.appendChild(labelRenderer.domElement);
        
        // Controles
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.zoomSpeed = 1.2;
        controls.rotateSpeed = 1.0;
        controls.enablePan = true;
        
        // =========================
        // ELEMENTOS DA CENA
        // =========================
        
        // Grade de chão
        const gridHelper = new THREE.GridHelper(8, 20, 0x4488ff, 0x333366);
        gridHelper.position.y = -0.2;
        scene.add(gridHelper);
        
        // Círculo central (Asura)
        const centerCircle = new THREE.Mesh(
            new THREE.CircleGeometry(0.5, 32),
            new THREE.MeshStandardMaterial({ color: 0xffaa44, emissive: 0xff4400, emissiveIntensity: 0.3, side: THREE.DoubleSide })
        );
        centerCircle.rotation.x = -Math.PI / 2;
        centerCircle.position.y = -0.19;
        scene.add(centerCircle);
        
        // Asura (representação 3D)
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
        
        // Anéis orbitais (referência)
        const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 64, 200);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x44aaff, transparent: true, opacity: 0.3 });
        const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
        orbitRing1.rotation.x = Math.PI / 2;
        scene.add(orbitRing1);
        
        const ringGeo2 = new THREE.TorusGeometry(1.8, 0.02, 64, 200);
        const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat);
        orbitRing2.rotation.x = Math.PI / 2;
        scene.add(orbitRing2);
        
        // Eixos de referência
        const axesHelper = new THREE.AxesHelper(2.5);
        axesHelper.material.transparent = true;
        axesHelper.material.opacity = 0.15;
        scene.add(axesHelper);
        
        // Luzes
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(2, 5, 3);
        scene.add(mainLight);
        const fillLight = new THREE.PointLight(0x4488ff, 0.5);
        fillLight.position.set(0, 2, 0);
        scene.add(fillLight);
        
        // =========================
        // PORTAIS (objetos 3D)
        // =========================
        const portalMeshes = [];
        
        function updatePortalColors() {
            const asuraColor = asurasConfig[currentAsura].color;
            portalMeshes.forEach((mesh, idx) => {
                if (mesh.material) {
                    mesh.material.color.setStyle(idx === selectedPortalIndex ? '#ffaa44' : asuraColor);
                    mesh.material.emissive.setStyle(idx === selectedPortalIndex ? '#ffaa44' : asuraColor);
                }
            });
        }
        
        function createPortalMesh(x, z, y, name, icon, isSelected = false) {
            const group = new THREE.Group();
            const asuraColor = asurasConfig[currentAsura].color;
            
            // Anel principal
            const geometry = new THREE.TorusGeometry(0.35, 0.05, 32, 64);
            const material = new THREE.MeshStandardMaterial({
                color: isSelected ? '#ffaa44' : asuraColor,
                emissive: isSelected ? '#ffaa44' : asuraColor,
                emissiveIntensity: 0.6,
                metalness: 0.8
            });
            const ring = new THREE.Mesh(geometry, material);
            group.add(ring);
            
            // Anel externo
            const outerGeo = new THREE.TorusGeometry(0.42, 0.03, 32, 64);
            const outerMat = new THREE.MeshStandardMaterial({
                color: isSelected ? '#ffaa44' : asuraColor,
                emissive: isSelected ? '#ffaa44' : asuraColor,
                emissiveIntensity: 0.3,
                transparent: true
            });
            const outerRing = new THREE.Mesh(outerGeo, outerMat);
            group.add(outerRing);
            
            // Esfera central (glow)
            const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
            const sphereMat = new THREE.MeshStandardMaterial({
                color: isSelected ? '#ffaa44' : asuraColor,
                emissive: isSelected ? '#ffaa44' : asuraColor,
                emissiveIntensity: 0.8
            });
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
            
            const label = new CSS2DObject(div);
            label.position.set(x, y + 0.5, z);
            return label;
        }
        
        function rebuildPortals() {
            // Remover portais antigos
            portalMeshes.forEach(portal => scene.remove(portal));
            portalMeshes.length = 0;
            
            // Remover labels antigos
            scene.children.forEach(child => {
                if (child.isCSS2DObject) scene.remove(child);
            });
            
            // Recriar portais
            portals.forEach((portal, idx) => {
                const portalMesh = createPortalMesh(portal.x, portal.z, portal.y || 0.3, portal.name, portal.icon, idx === selectedPortalIndex);
                scene.add(portalMesh);
                portalMeshes.push(portalMesh);
                
                const label = createLabel(portal.name, portal.icon, portal.x, portal.z, portal.y || 0.3);
                scene.add(label);
            });
            
            // Atualizar lista de portais no painel
            updatePortalsList();
        }
        
        function updatePortalsList() {
            const list = document.getElementById('portalsList');
            const asuraColor = asurasConfig[currentAsura].color;
            
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
            
            // Adicionar eventos
            document.querySelectorAll('.portal-item').forEach(el => {
                el.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-portal')) return;
                    const idx = parseInt(el.dataset.index);
                    selectedPortalIndex = idx;
                    updatePortalsList();
                    rebuildPortals();
                });
            });
            
            document.querySelectorAll('.delete-portal').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.dataset.index);
                    portals.splice(idx, 1);
                    if (selectedPortalIndex >= portals.length) selectedPortalIndex = -1;
                    rebuildPortals();
                });
            });
        }
        
        // =========================
        // EVENTOS
        // =========================
        
        // Selecionar Asura
        const asuraSelector = document.getElementById('asuraSelector');
        Object.keys(asurasConfig).forEach(key => {
            const btn = document.createElement('button');
            btn.className = `asura-btn ${key === currentAsura ? 'active' : ''}`;
            btn.textContent = `${asurasConfig[key].icon} ${asurasConfig[key].name}`;
            btn.style.setProperty('--asura-color', asurasConfig[key].color);
            btn.addEventListener('click', () => {
                currentAsura = key;
                portals = JSON.parse(JSON.stringify(defaultPortals[currentAsura] || []));
                selectedPortalIndex = -1;
                
                // Atualizar UI
                document.querySelectorAll('.asura-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('mapTitle').textContent = `📍 ${asurasConfig[currentAsura].name} - Posição dos Portais`;
                document.getElementById('mapTitle').style.setProperty('--asura-color', asurasConfig[currentAsura].color);
                
                // Atualizar cena
                const color = asurasConfig[currentAsura].color;
                orbitRing1.material.color.setStyle(color);
                orbitRing2.material.color.setStyle(color);
                centerCircle.material.color.setStyle(color);
                
                rebuildPortals();
                updatePortalColors();
            });
            asuraSelector.appendChild(btn);
        });
        
        // Adicionar portal
        document.getElementById('addPortalBtn').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('posX').value);
            const z = parseFloat(document.getElementById('posZ').value);
            const y = parseFloat(document.getElementById('posY').value);
            const name = document.getElementById('portalName').value.trim();
            const icon = document.getElementById('portalIcon').value.trim() || '🚪';
            
            if (!name) {
                alert('Digite um nome para o portal');
                return;
            }
            
            // Verificar se posição já está ocupada
            const occupied = portals.some(p => Math.abs(p.x - x) < 0.3 && Math.abs(p.z - z) < 0.3);
            if (occupied) {
                alert('⚠️ Esta posição já está ocupada por outro portal!');
                return;
            }
            
            portals.push({ name, icon, x, y, z, description: '' });
            selectedPortalIndex = portals.length - 1;
            rebuildPortals();
            
            // Limpar campos
            document.getElementById('portalName').value = '';
            document.getElementById('portalIcon').value = '';
        });
        
        // Posições rápidas
        document.querySelectorAll('.coord-preset').forEach(el => {
            el.addEventListener('click', () => {
                const x = parseFloat(el.dataset.x);
                const z = parseFloat(el.dataset.z);
                document.getElementById('posX').value = x;
                document.getElementById('posZ').value = z;
            });
        });
        
        // Exportar configuração
        document.getElementById('exportBtn').addEventListener('click', () => {
            const config = {
                asura: currentAsura,
                portals: portals
            };
            const dataStr = JSON.stringify(config, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `portals_${currentAsura}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
        
        // Importar configuração
        document.getElementById('importBtn').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const config = JSON.parse(ev.target.result);
                        if (config.asura === currentAsura) {
                            portals = config.portals;
                            selectedPortalIndex = -1;
                            rebuildPortals();
                        } else {
                            alert(`Este arquivo é para ${config.asura}, você está em ${currentAsura}`);
                        }
                    } catch (err) {
                        alert('Arquivo inválido');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        });
        
        // =========================
        // ANIMAÇÃO
        // =========================
        let time = 0;
        
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            
            // Animar anéis
            orbitRing1.rotation.z += 0.003;
            orbitRing2.rotation.z -= 0.002;
            
            // Animar asura
            asuraGroup.position.y = Math.sin(time * 2) * 0.03;
            
            // Animar portais
            portalMeshes.forEach((portal, idx) => {
                const yOffset = Math.sin(time * 2 + idx) * 0.03;
                portal.position.y = (portal.userData.y || 0.3) + yOffset;
                portal.rotation.z += 0.01;
            });
            
            controls.update();
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        }
        
        animate();
        
        // Redimensionamento
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            labelRenderer.setSize(width, height);
        });
        
        // Inicializar
        rebuildPortals();
        
        console.log('🗺️ Portal Planner carregado! Use o mouse para rotacionar a visão.');
    </script>
</body>
</html>