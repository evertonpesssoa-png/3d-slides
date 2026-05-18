export class VoiceAssistant {
    constructor(buttonElement, onResult) {
        this.button = buttonElement;
        this.onResult = onResult;
        this.isListening = false;
        this.recognition = null;
        this.init();
    }
    
    init() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Reconhecimento de voz não suportado');
            this.button.style.opacity = '0.5';
            this.button.title = 'Voz não suportada';
            return;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'pt-BR';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        
        this.recognition.onstart = () => {
            this.isListening = true;
            this.button.classList.add('listening');
        };
        
        this.recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            console.log('🎤 Reconhecido:', text);
            if (this.onResult) this.onResult(text);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Erro no reconhecimento:', event.error);
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.button.classList.remove('listening');
        };
        
        this.button.addEventListener('click', () => {
            if (this.isListening) {
                this.recognition.stop();
            } else {
                try {
                    this.recognition.start();
                } catch (e) {
                    console.log('Recognition already started');
                }
            }
        });
    }
    
    speak(text) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }
}