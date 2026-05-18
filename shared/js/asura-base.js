import * as THREE from 'three';
import { initThree, addBasicLights, addGround, addParticles, addRings, loadModel, startAnimation } from './three-setup.js';
import { VoiceAssistant } from './voice-assistant.js';
import { ChatSystem } from './chat.js';
import { initUI } from './ui.js';

export async function initWorld(config) {
    // Setup 3D
    const { scene, camera, renderer, controls } = initThree(config);
    const { fillLight } = addBasicLights(scene, config.color);
    const { circleGlow } = addGround(scene, config.color);
    const { particles } = addParticles(scene, config.color);
    const { ring, ring2 } = addRings(scene, config.color);
    
    // Carregar modelo
    const { mixer } = await loadModel(scene, config);
    
    // UI
    initUI(config);
    
    // Chat
    const chat = new ChatSystem('chatContainer', config, (response) => {
        voice.speak(response);
    });
    
    // Voz
    const voiceButton = document.getElementById('voiceButton');
    const voice = new VoiceAssistant(voiceButton, (text) => {
        document.getElementById('chatInput').value = text;
        chat.send();
    });
    
    // Animação
    startAnimation(scene, camera, renderer, controls, {
        mixer,
        particles,
        ring,
        ring2,
        fillLight,
        circleGlow
    });
    
    console.log(`🟢 Mundo da ${config.name} carregado com sucesso!`);
}