/**
 * Procedural Web Audio API Synthesizer for Forest Ambience
 * Generates organic ambient wind, rhythmic nocturnal crickets, and ethereal firefly chimes.
 * Requires 0 external audio files!
 */

export class ForestAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;

  // Master & Node channels
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private cricketsGain: GainNode | null = null;
  private chimesGain: GainNode | null = null;

  // Wind loop
  private windSource: AudioBufferSourceNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windLfo: OscillatorNode | null = null;

  // Timers
  private cricketsTimer: number | null = null;
  private chimesTimer: number | null = null;

  // Volume states
  private windLevel = 0.5;
  private cricketsLevel = 0.35;
  private chimesLevel = 0.4;
  private masterLevel = 0.6;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterLevel, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(this.windLevel, this.ctx.currentTime);
      this.windGain.connect(this.masterGain);

      this.cricketsGain = this.ctx.createGain();
      this.cricketsGain.gain.setValueAtTime(this.cricketsLevel, this.ctx.currentTime);
      this.cricketsGain.connect(this.masterGain);

      this.chimesGain = this.ctx.createGain();
      this.chimesGain.gain.setValueAtTime(this.chimesLevel, this.ctx.currentTime);
      this.chimesGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async start() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Start Wind
    this.startWind();

    // Start Crickets sequence
    this.scheduleCrickets();

    // Start Chimes sequence
    this.scheduleChimes();
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.windSource) {
      try {
        this.windSource.stop();
        this.windSource.disconnect();
      } catch {
        // ignore
      }
      this.windSource = null;
    }

    if (this.windLfo) {
      try {
        this.windLfo.stop();
        this.windLfo.disconnect();
      } catch {
        // ignore
      }
      this.windLfo = null;
    }

    if (this.cricketsTimer) {
      window.clearTimeout(this.cricketsTimer);
      this.cricketsTimer = null;
    }

    if (this.chimesTimer) {
      window.clearTimeout(this.chimesTimer);
      this.chimesTimer = null;
    }
  }

  public toggleMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : this.masterLevel, now + 0.08);
    }
  }

  public setMasterVolume(val: number) {
    this.masterLevel = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.linearRampToValueAtTime(this.masterLevel, this.ctx.currentTime + 0.05);
    }
  }

  public setWindVolume(val: number) {
    this.windLevel = Math.max(0, Math.min(1, val));
    if (this.windGain && this.ctx) {
      this.windGain.gain.linearRampToValueAtTime(this.windLevel, this.ctx.currentTime + 0.05);
    }
  }

  public setCricketsVolume(val: number) {
    this.cricketsLevel = Math.max(0, Math.min(1, val));
    if (this.cricketsGain && this.ctx) {
      this.cricketsGain.gain.linearRampToValueAtTime(this.cricketsLevel, this.ctx.currentTime + 0.05);
    }
  }

  public setChimesVolume(val: number) {
    this.chimesLevel = Math.max(0, Math.min(1, val));
    if (this.chimesGain && this.ctx) {
      this.chimesGain.gain.linearRampToValueAtTime(this.chimesLevel, this.ctx.currentTime + 0.05);
    }
  }

  private startWind() {
    if (!this.ctx || !this.windGain) return;

    // Generate 4-second looping pink noise buffer
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    this.windSource = this.ctx.createBufferSource();
    this.windSource.buffer = buffer;
    this.windSource.loop = true;

    // Bandpass filter for organic rustling breeze
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO to slowly modulate wind frequency (gusts)
    this.windLfo = this.ctx.createOscillator();
    this.windLfo.type = 'sine';
    this.windLfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // 0.18 Hz slow cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);

    this.windLfo.connect(lfoGain);
    lfoGain.connect(this.windFilter.frequency);

    this.windSource.connect(this.windFilter);
    this.windFilter.connect(this.windGain);

    this.windSource.start();
    this.windLfo.start();
  }

  private scheduleCrickets() {
    if (!this.isPlaying || !this.ctx || !this.cricketsGain) return;

    this.triggerCricketBurst();

    // Rhythmic chirping intervals with natural variations
    const nextInterval = 700 + Math.random() * 1200;
    this.cricketsTimer = window.setTimeout(() => this.scheduleCrickets(), nextInterval);
  }

  private triggerCricketBurst() {
    if (!this.ctx || !this.cricketsGain || this.isMuted) return;

    const count = 3 + Math.floor(Math.random() * 3);
    const baseFreq = 4800 + (Math.random() * 400 - 200);
    const now = this.ctx.currentTime;

    for (let i = 0; i < count; i++) {
      const chirpTime = now + i * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, chirpTime);

      gain.gain.setValueAtTime(0, chirpTime);
      gain.gain.linearRampToValueAtTime(0.12, chirpTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, chirpTime + 0.05);

      osc.connect(gain);
      gain.connect(this.cricketsGain);

      osc.start(chirpTime);
      osc.stop(chirpTime + 0.055);
    }
  }

  private scheduleChimes() {
    if (!this.isPlaying || !this.ctx || !this.chimesGain) return;

    this.triggerChimePing();

    // Ethereal bell intervals (every 2.5 - 6 seconds)
    const nextInterval = 2500 + Math.random() * 3500;
    this.chimesTimer = window.setTimeout(() => this.scheduleChimes(), nextInterval);
  }

  private triggerChimePing() {
    if (!this.ctx || !this.chimesGain || this.isMuted) return;

    // Pentatonic scale frequencies: C5, D5, E5, G5, A5, C6
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Ethereal ringing envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(gain);
    gain.connect(this.chimesGain);

    osc.start(now);
    osc.stop(now + 2.25);
  }
}

export const forestAudio = new ForestAudioSynthesizer();

