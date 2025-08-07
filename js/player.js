document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const seekSlider = document.getElementById('seekSlider');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playlistElement = document.getElementById('playlist');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const currentArtist = document.getElementById('currentArtist');
    const currentAlbumArt = document.getElementById('currentAlbumArt');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const saveSettings = document.getElementById('saveSettings');
    const resetSettings = document.getElementById('resetSettings');
    const fullscreenPlayer = document.getElementById('fullscreenPlayer');
    const fullscreenPlayBtn = document.getElementById('fullscreenPlayBtn');
    const fullscreenPrevBtn = document.getElementById('fullscreenPrevBtn');
    const fullscreenNextBtn = document.getElementById('fullscreenNextBtn');
    const fullscreenVolumeSlider = document.getElementById('fullscreenVolumeSlider');
    const fullscreenSeekSlider = document.getElementById('fullscreenSeekSlider');
    const fullscreenCurrentTime = document.getElementById('fullscreenCurrentTime');
    const fullscreenDuration = document.getElementById('fullscreenDuration');
    const fullscreenSongTitle = document.getElementById('fullscreenSongTitle');
    const fullscreenArtist = document.getElementById('fullscreenArtist');
    const fullscreenAlbumArt = document.getElementById('fullscreenAlbumArt');
    const visualizer = document.getElementById('visualizer');
    const fullscreenVisualizer = document.getElementById('fullscreenVisualizer');
    const lyricsBtn = document.getElementById('lyricsBtn');
    const lyricsModal = document.getElementById('lyricsModal');
    const closeLyrics = document.getElementById('closeLyrics');
    const lyricsText = document.getElementById('lyricsText');
    const lyricsTitle = document.getElementById('lyricsTitle');
    const fullscreenLyrics = document.getElementById('fullscreenLyrics');
    const equalizerBtn = document.getElementById('equalizerBtn');
    const equalizerModal = document.getElementById('equalizerModal');
    const closeEqualizer = document.getElementById('closeEqualizer');
    const resetEqualizer = document.getElementById('resetEqualizer');
    const saveEqualizer = document.getElementById('saveEqualizer');
    const eqSliders = document.querySelectorAll('.eq-slider');
    const eqPresetBtns = document.querySelectorAll('.eq-preset-btn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const addSongBtn = document.getElementById('addSongBtn');
    const addSongModal = document.getElementById('addSongModal');
    const closeAddSong = document.getElementById('closeAddSong');
    const songUrl = document.getElementById('songUrl');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const songAlbumArt = document.getElementById('songAlbumArt');
    const addUrlSongBtn = document.getElementById('addUrlSongBtn');
    const songUpload = document.getElementById('songUpload');
    const startUploadBtn = document.getElementById('startUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Audio context for visualizer and equalizer
    let audioContext;
    let analyser;
    let source;
    let gainNodes = [];
    let filters = [];
    let isAudioContextInitialized = false;
    
    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isLooping = false;
    let isCrossfadeEnabled = false;
    let crossfadeDuration = 3;
    let sleepTimer = null;
    let originalPlaylist = [];
    let shuffledPlaylist = [];
    let filteredPlaylist = null;
    
    // Mock music data with lyrics
    const defaultSongs = [
        {
            title: "Bol Do Na Zara",
            artist: "Ambient Waves",
            duration: "3:45",
            file: "./songs/Bol Do Na Zara.mp3",
            albumArt: "./assets/img1.jpeg",
            lyrics: "",
            isDefault: true
        },
        {
            title: "Hamdum savi",
            artist: "Jimi Hendrix",
            duration: "4:15",
            file: "./songs/Humdum savi.mp3",
            albumArt: "./assets/img2.jpeg",
            lyrics: "Purple haze all in my brain\nLately things don't seem the same\nActing funny but I don't know why\nExcuse me while I kiss the sky",
            isDefault: true
        },
        {
            title: "Jab tak",
            artist: "Beethoven",
            duration: "5:30",
            file: "./songs/Jab tak.mp3",
            albumArt: "./assets/Img3.jpeg",
            lyrics: "No lyrics available\nThis is an instrumental piece",
            isDefault: true
        },
        {
            title: "Main rahoon ue na rahoon",
            artist: "Nature Sounds",
            duration: "6:20",
            file: "./songs/Main Rahoon Ya Na Rahoon.mp3",
            albumArt: "./assets/Img11.jpeg",
            lyrics: "The sound of waves crashing\nSeagulls calling in the distance\nA gentle breeze carries the salt air\nPeaceful moments by the shore",
            isDefault: true
        },
        {
            title: "Pal pal dil ke paas",
            artist: "Chill Out",
            duration: "3:10",
            file: "./songs/Pal pal dil ke paas.mp3",
            albumArt: "./assets/Img9.jpeg",
            lyrics: "Sunshine on my face\nWarm sand beneath my feet\nCool drink in my hand\nSummer vibes so sweet",
            isDefault: true
        },
        {
            title: "Pal Pal",
            artist: "Electronic Dreams",
            duration: "4:50",
            file: "./songs/Pal pal.mp3",
            albumArt: "./assets/Img5.jpeg",
            lyrics: "As the sun goes down\nThe city lights come alive\nNeon reflections\nIn the midnight drive",
            isDefault: true
        },
        {
            title: "Pal",
            artist: "Acoustic Mornings",
            duration: "3:25",
            file: "./songs/Pal.mp3",
            albumArt: "./assets/Img6.jpeg",
            lyrics: "Morning dew on the grass\nSunrise coming fast\nBirds singing their song\nA new day has begun",
            isDefault: true
        },
        {
            title: "Pasoori Nu",
            artist: "City Sounds",
            duration: "5:15",
            file: "./songs/Pasoori Nu.mp3",
            albumArt: "./assets/Img7.jpeg",
            lyrics: "Concrete canyons tower high\nYellow cabs go speeding by\nThe pulse of life, the city's beat\nNever stops, never sleeps",
            isDefault: true
        },
        {
            title: "Teri aaknhon mein",
            artist: "Acoustic Mornings",
            duration: "3:25",
            file: "./songs/Teri Aankhon.mp3",
            albumArt: "./assets/Img10.jpeg",
            lyrics: "Morning dew on the grass\nSunrise coming fast\nBirds singing their song\nA new day has begun",
            isDefault: true
        },
        {
            title: "Zara sa",
            artist: "City Sounds",
            duration: "5:15",
            file: "./songs/Zara Sa.mp3",
            albumArt: "./assets/Img8.jpeg",
            lyrics: "Concrete canyons tower high\nYellow cabs go speeding by\nThe pulse of life, the city's beat\nNever stops, never sleeps",
            isDefault: true
        },
    ];
    
    // Initialize
    function init() {
        // Load default songs and any user-uploaded songs
        const userSongs = JSON.parse(localStorage.getItem('userSongs')) || [];
        originalPlaylist = [...defaultSongs, ...userSongs];
        
        renderPlaylist();
        loadSettings();
        updatePlayerInfo();
        
        // Set initial volume
        audioPlayer.volume = volumeSlider.value;
        fullscreenVolumeSlider.value = volumeSlider.value;
        
        // Load the first song
        loadSong(currentSongIndex);
        
        // Initialize audio context when user interacts
        document.body.addEventListener('click', initAudioContext, { once: true });
    }
    
    // Initialize audio context for visualizer and equalizer
    function initAudioContext() {
        if (isAudioContextInitialized) return;
        
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        source = audioContext.createMediaElementSource(audioPlayer);
        
        // Create equalizer bands
        const frequencies = [60, 150, 400, 1000, 2400, 15000];
        frequencies.forEach(freq => {
            const filter = audioContext.createBiquadFilter();
            filter.type = "peaking";
            filter.frequency.value = freq;
            filter.Q.value = 1;
            filter.gain.value = 0;
            
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 1;
            
            filters.push(filter);
            gainNodes.push(gainNode);
        });
        
        // Connect nodes: source -> filters -> analyser -> destination
        let lastNode = source;
        filters.forEach((filter, index) => {
            lastNode.connect(filter);
            lastNode = filter;
            filter.connect(gainNodes[index]);
            gainNodes[index].connect(analyser);
        });
        analyser.connect(audioContext.destination);
        
        isAudioContextInitialized = true;
        
        // Start visualizer
        visualize();
    }
    
    // Audio visualization
    function visualize() {
        if (!analyser) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        
        // Draw visualizer
        drawVisualizer(visualizer, dataArray, bufferLength);
        drawVisualizer(fullscreenVisualizer, dataArray, bufferLength);
        
        requestAnimationFrame(visualize);
    }
    
    // Draw visualizer on canvas
    function drawVisualizer(canvas, dataArray, bufferLength) {
        if (!canvas || !dataArray) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        const barWidth = width / bufferLength;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * height;
            
            ctx.fillStyle = `hsl(${i * 360 / bufferLength}, 100%, 50%)`;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);
            
            x += barWidth;
        }
    }
    
    // Apply equalizer settings
    function applyEqualizer(preset) {
        if (!filters.length) return;
        
        const presets = {
            flat: [0, 0, 0, 0, 0, 0],
            pop: [4, 2, -2, 1, 3, 2],
            rock: [6, 3, -1, 2, 4, 3],
            jazz: [2, 3, 1, -1, 1, 4],
            classical: [0, 0, 0, 0, 0, 5],
            bass: [8, 5, 2, -2, -3, -4],
            treble: [-4, -2, 0, 2, 6, 8],
            vocal: [-3, -1, 2, 4, 1, -2]
        };
        
        const gains = presets[preset] || presets.flat;
        
        filters.forEach((filter, index) => {
            filter.gain.value = gains[index];
        });
        
        // Update slider positions
        eqSliders.forEach((slider, index) => {
            slider.value = gains[index];
        });
    }
    
    // Render playlist
    function renderPlaylist(filteredList = null) {
        playlistElement.innerHTML = '';
        const songsToRender = filteredList || (isShuffled ? shuffledPlaylist : originalPlaylist);
        filteredPlaylist = filteredList;
        
        songsToRender.forEach((song, index) => {
            const li = document.createElement('li');
            li.classList.add('song-item');
            if (index === currentSongIndex && !filteredList) {
                li.classList.add('active');
            }
            
            li.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-info-small">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
                <div class="song-duration">${song.duration}</div>
                ${!song.isDefault ? `<button class="delete-song-btn" data-index="${index}" title="Delete song"><i class="fas fa-trash"></i></button>` : ''}
            `;
            
            li.addEventListener('click', (e) => {
                // Don't change song if delete button was clicked
                if (e.target.closest('.delete-song-btn')) return;
                
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
                updateActiveSong();
            });
            
            // Add delete button event listener if it's a user-uploaded song
            if (!song.isDefault) {
                const deleteBtn = li.querySelector('.delete-song-btn');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteSong(index);
                });
            }
            
            playlistElement.appendChild(li);
        });
    }
    
    // Delete a song from the playlist
    function deleteSong(index) {
        // Remove from original playlist
        const songToDelete = originalPlaylist[index];
        if (songToDelete.isDefault) return; // Can't delete default songs
        
        originalPlaylist.splice(index, 1);
        
        // Remove from shuffled playlist if it exists
        if (isShuffled) {
            const shuffledIndex = shuffledPlaylist.findIndex(song => 
                song.title === songToDelete.title && song.artist === songToDelete.artist
            );
            if (shuffledIndex !== -1) {
                shuffledPlaylist.splice(shuffledIndex, 1);
            }
        }
        
        // Update current song index if needed
        if (currentSongIndex >= index) {
            currentSongIndex = Math.max(0, currentSongIndex - 1);
        }
        
        // Save updated playlist to local storage
        const userSongs = originalPlaylist.filter(song => !song.isDefault);
        localStorage.setItem('userSongs', JSON.stringify(userSongs));
        
        // Reload the current song if it was deleted
        const currentSong = (filteredPlaylist || (isShuffled ? shuffledPlaylist : originalPlaylist))[currentSongIndex];
        if (!currentSong || (currentSong.title === songToDelete.title && currentSong.artist === songToDelete.artist)) {
            loadSong(currentSongIndex);
            if (isPlaying) {
                playSong();
            }
        }
        
        renderPlaylist();
        showNotification('Song deleted');
    }
    
    // Load song
    function loadSong(index) {
        const songsToUse = filteredPlaylist || (isShuffled ? shuffledPlaylist : originalPlaylist);
        if (index >= 0 && index < songsToUse.length) {
            const song = songsToUse[index];
            audioPlayer.src = song.file;
            currentSongTitle.textContent = song.title;
            currentArtist.textContent = song.artist;
            currentAlbumArt.src = song.albumArt;
            
            // Update fullscreen player info
            fullscreenSongTitle.textContent = song.title;
            fullscreenArtist.textContent = song.artist;
            fullscreenAlbumArt.src = song.albumArt;
            
            // Update lyrics
            updateLyrics(song);
            
            // Update active song in playlist
            updateActiveSong();
            
            // Load metadata for duration
            audioPlayer.addEventListener('loadedmetadata', () => {
                durationDisplay.textContent = formatTime(audioPlayer.duration);
                fullscreenDuration.textContent = formatTime(audioPlayer.duration);
            }, { once: true });
        }
    }
    
    // Update lyrics display
    function updateLyrics(song) {
        const lyrics = song.lyrics || "No lyrics available for this song.";
        lyricsText.textContent = lyrics;
        fullscreenLyrics.textContent = lyrics;
        lyricsTitle.textContent = `${song.title} - ${song.artist}`;
    }
    
    // Play song with optional crossfade
    function playSong() {
        if (isCrossfadeEnabled && isPlaying) {
            // Start crossfade
            const fadeDuration = crossfadeDuration;
            const fadeOutTime = Math.min(audioPlayer.currentTime, fadeDuration);
            const fadeOutStep = audioPlayer.volume / (fadeOutTime * 60);
            
            const fadeOutInterval = setInterval(() => {
                if (audioPlayer.volume > 0) {
                    audioPlayer.volume -= fadeOutStep;
                } else {
                    clearInterval(fadeOutInterval);
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                    audioPlayer.volume = parseFloat(volumeSlider.value);
                    audioPlayer.play();
                }
            }, 1000 / 60);
        } else {
            audioPlayer.play();
        }
        
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        fullscreenPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Initialize audio context if not already done
        if (!isAudioContextInitialized) {
            initAudioContext();
        }
    }
    
    // Pause song
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        fullscreenPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Next song
    function nextSong() {
        const songsToUse = filteredPlaylist || (isShuffled ? shuffledPlaylist : originalPlaylist);
        currentSongIndex = (currentSongIndex + 1) % songsToUse.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Previous song
    function prevSong() {
        const songsToUse = filteredPlaylist || (isShuffled ? shuffledPlaylist : originalPlaylist);
        currentSongIndex = (currentSongIndex - 1 + songsToUse.length) % songsToUse.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Update active song in playlist
    function updateActiveSong() {
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update player info (time, progress bar)
    function updatePlayerInfo() {
        // Current time
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        fullscreenCurrentTime.textContent = formatTime(audioPlayer.currentTime);
        
        // Progress sliders
        if (!seekSlider.dragging) {
            const seekPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
            seekSlider.value = seekPercent;
            fullscreenSeekSlider.value = seekPercent;
        }
        
        // Request next frame
        if (isPlaying) {
            requestAnimationFrame(updatePlayerInfo);
        }
    }
    
    // Search songs
    function searchSongs() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            filteredPlaylist = null;
            renderPlaylist();
            return;
        }
        
        const filteredSongs = originalPlaylist.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
        
        renderPlaylist(filteredSongs);
    }
    
    // Shuffle playlist
    function shufflePlaylist() {
        shuffledPlaylist = [...originalPlaylist];
        for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
        }
        currentSongIndex = 0;
        renderPlaylist();
        isShuffled = true;
        shuffleBtn.classList.add('active');
    }
    
    // Unshuffle playlist
    function unshufflePlaylist() {
        isShuffled = false;
        currentSongIndex = originalPlaylist.findIndex(
            song => song.title === (filteredPlaylist || shuffledPlaylist)[currentSongIndex].title
        );
        renderPlaylist();
        shuffleBtn.classList.remove('active');
    }
    
    // Toggle loop
    function toggleLoop() {
        isLooping = !isLooping;
        repeatBtn.classList.toggle('active');
    }
    
    // Set sleep timer
    function setSleepTimer(minutes) {
        clearTimeout(sleepTimer);
        
        if (minutes <= 0) return;
        
        const ms = minutes * 60 * 1000;
        sleepTimer = setTimeout(() => {
            pauseSong();
            showNotification(`Sleep timer: Player stopped after ${minutes} minutes`);
        }, ms);
        
        showNotification(`Sleep timer set for ${minutes} minutes`);
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Load settings from localStorage
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('musicPlayerSettings')) || {};
        
        // Theme
        const theme = settings.theme || 'lavender';
        document.body.className = `${theme}-theme`;
        document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add('active');
        
        // Checkboxes
        document.getElementById('autoplayCheckbox').checked = settings.autoplay !== false;
        document.getElementById('shuffleCheckbox').checked = settings.shuffle || false;
        document.getElementById('loopCheckbox').checked = settings.loop || false;
        document.getElementById('crossfadeCheckbox').checked = settings.crossfade || false;
        document.getElementById('showVisualizerCheckbox').checked = settings.showVisualizer !== false;
        document.getElementById('showLyricsCheckbox').checked = settings.showLyrics || false;
        document.getElementById('compactModeCheckbox').checked = settings.compactMode || false;
        document.getElementById('rememberPositionCheckbox').checked = settings.rememberPosition !== false;
        document.getElementById('enableHotkeysCheckbox').checked = settings.enableHotkeys !== false;
        
        // Apply checkbox states
        isShuffled = settings.shuffle || false;
        isLooping = settings.loop || false;
        isCrossfadeEnabled = settings.crossfade || false;
        
        if (isShuffled) {
            shufflePlaylist();
        }
        
        if (isLooping) {
            repeatBtn.classList.add('active');
        }
        
        // Crossfade settings
        crossfadeDuration = settings.crossfadeDuration || 3;
        document.getElementById('crossfadeDuration').value = crossfadeDuration;
        document.getElementById('crossfadeValue').textContent = `${crossfadeDuration}s`;
        
        if (isCrossfadeEnabled) {
            document.getElementById('crossfadeSettings').style.display = 'block';
            document.getElementById('crossfadeDuration').disabled = false;
        }
        
        // Audio quality
        document.getElementById('audioQuality').value = settings.audioQuality || 'medium';
        
        // Equalizer preset
        const eqPreset = settings.equalizerPreset || 'flat';
        document.getElementById('equalizerPreset').value = eqPreset;
        applyEqualizer(eqPreset);
        
        // Volume
        const savedVolume = settings.volume !== undefined ? settings.volume : 0.7;
        volumeSlider.value = savedVolume;
        fullscreenVolumeSlider.value = savedVolume;
        audioPlayer.volume = savedVolume;
        document.getElementById('defaultVolume').value = savedVolume;
        document.getElementById('volumeValue').textContent = `${Math.round(savedVolume * 100)}%`;
        
        // Sleep timer
        const sleepTimerValue = settings.sleepTimer || '0';
        document.getElementById('sleepTimer').value = sleepTimerValue;
        
        if (sleepTimerValue === 'custom') {
            document.getElementById('customSleepTimer').style.display = 'block';
            document.getElementById('customSleepTime').disabled = false;
            document.getElementById('customSleepTime').value = settings.customSleepTime || 30;
        }
        
        // Compact mode
        if (settings.compactMode) {
            document.body.classList.add('compact-mode');
        }
    }
    
    // Save settings to localStorage
    function saveSettingsToStorage() {
        const settings = {
            theme: document.body.classList.contains('lavender-theme') ? 'lavender' : 
                  document.body.classList.contains('dark-theme') ? 'dark' : 
                  document.body.classList.contains('light-theme') ? 'light' :
                  document.body.classList.contains('ocean-theme') ? 'ocean' : 'forest',
            autoplay: document.getElementById('autoplayCheckbox').checked,
            shuffle: document.getElementById('shuffleCheckbox').checked,
            loop: document.getElementById('loopCheckbox').checked,
            crossfade: document.getElementById('crossfadeCheckbox').checked,
            crossfadeDuration: parseInt(document.getElementById('crossfadeDuration').value),
            audioQuality: document.getElementById('audioQuality').value,
            equalizerPreset: document.getElementById('equalizerPreset').value,
            volume: parseFloat(volumeSlider.value),
            showVisualizer: document.getElementById('showVisualizerCheckbox').checked,
            showLyrics: document.getElementById('showLyricsCheckbox').checked,
            compactMode: document.getElementById('compactModeCheckbox').checked,
            rememberPosition: document.getElementById('rememberPositionCheckbox').checked,
            enableHotkeys: document.getElementById('enableHotkeysCheckbox').checked,
            sleepTimer: document.getElementById('sleepTimer').value,
            customSleepTime: parseInt(document.getElementById('customSleepTime').value) || 30
        };
        
        localStorage.setItem('musicPlayerSettings', JSON.stringify(settings));
    }
    
    // Reset settings to default
    function resetSettingsToDefault() {
        localStorage.removeItem('musicPlayerSettings');
        loadSettings();
        showNotification('Settings reset to default');
    }
    
    // Add song from URL
    function addSongFromUrl() {
        const url = songUrl.value.trim();
        const title = songTitle.value.trim();
        const artist = songArtist.value.trim();
        const albumArt = songAlbumArt.value.trim();
        
        if (!url || !title || !artist) {
            showNotification('Please fill in all required fields');
            return;
        }
        
        const newSong = {
            title,
            artist,
            duration: '0:00',
            file: url,
            albumArt: albumArt || 'https://via.placeholder.com/300',
            lyrics: 'No lyrics available',
            isDefault: false
        };
        
        // Add to playlist
        originalPlaylist.push(newSong);
        if (isShuffled) {
            shuffledPlaylist.push(newSong);
        }
        
        // Save to local storage
        const userSongs = JSON.parse(localStorage.getItem('userSongs')) || [];
        userSongs.push(newSong);
        localStorage.setItem('userSongs', JSON.stringify(userSongs));
        
        renderPlaylist();
        showNotification('Song added successfully');
        
        // Clear form
        songUrl.value = '';
        songTitle.value = '';
        songArtist.value = '';
        songAlbumArt.value = '';
    }
    
    // Handle file upload
    function handleFileUpload() {
        const files = songUpload.files;
        if (files.length === 0) return;
        
        uploadProgress.style.display = 'flex';
        const progressBar = uploadProgress.querySelector('.progress-bar div');
        const progressText = uploadProgress.querySelector('.progress-text');
        
        // Simulate upload progress (in a real app, you would use actual upload code)
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress >= 100) {
                clearInterval(interval);
                
                // Add uploaded files to playlist
                const userSongs = JSON.parse(localStorage.getItem('userSongs')) || [];
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileUrl = URL.createObjectURL(file);
                    
                    const newSong = {
                        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                        artist: 'Unknown Artist',
                        duration: '0:00',
                        file: fileUrl,
                        albumArt: 'https://via.placeholder.com/300',
                        lyrics: 'No lyrics available',
                        isDefault: false
                    };
                    
                    originalPlaylist.push(newSong);
                    if (isShuffled) {
                        shuffledPlaylist.push(newSong);
                    }
                    
                    userSongs.push(newSong);
                }
                
                // Save to local storage
                localStorage.setItem('userSongs', JSON.stringify(userSongs));
                
                renderPlaylist();
                showNotification(`${files.length} song(s) uploaded successfully`);
                
                // Reset upload
                songUpload.value = '';
                startUploadBtn.disabled = true;
                uploadProgress.style.display = 'none';
            }
            
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        }, 100);
    }
    
    // Event listeners
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
            updatePlayerInfo();
        }
    });
    
    fullscreenPlayBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
            updatePlayerInfo();
        }
    });
    
    prevBtn.addEventListener('click', prevSong);
    fullscreenPrevBtn.addEventListener('click', prevSong);
    
    nextBtn.addEventListener('click', nextSong);
    fullscreenNextBtn.addEventListener('click', nextSong);
    
    fullscreenBtn.addEventListener('click', () => {
        fullscreenPlayer.style.display = 'flex';
    });
    
    exitFullscreenBtn.addEventListener('click', () => {
        fullscreenPlayer.style.display = 'none';
    });
    
    volumeSlider.addEventListener('input', () => {
        audioPlayer.volume = volumeSlider.value;
        fullscreenVolumeSlider.value = volumeSlider.value;
    });
    
    fullscreenVolumeSlider.addEventListener('input', () => {
        audioPlayer.volume = fullscreenVolumeSlider.value;
        volumeSlider.value = fullscreenVolumeSlider.value;
    });
    
    // Seek slider events
    seekSlider.addEventListener('input', function() {
        this.dragging = true;
    });
    
    seekSlider.addEventListener('change', function() {
        const seekPercent = this.value;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (seekPercent / 100) * duration;
        this.dragging = false;
    });
    
    fullscreenSeekSlider.addEventListener('input', function() {
        this.dragging = true;
    });
    
    fullscreenSeekSlider.addEventListener('change', function() {
        const seekPercent = this.value;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (seekPercent / 100) * duration;
        this.dragging = false;
    });
    
    audioPlayer.addEventListener('timeupdate', () => {
        updatePlayerInfo();
    });
    
    audioPlayer.addEventListener('ended', () => {
        if (isLooping) {
            audioPlayer.currentTime = 0;
            playSong();
        } else if (document.getElementById('autoplayCheckbox').checked) {
            nextSong();
        } else {
            pauseSong();
        }
    });
    
    searchInput.addEventListener('input', searchSongs);
    searchBtn.addEventListener('click', searchSongs);
    
    // Settings modal
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
        equalizerModal.style.display = 'none';
        lyricsModal.style.display = 'none';
        addSongModal.style.display = 'none';
    });
    
    closeSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (e.target === equalizerModal) {
            equalizerModal.style.display = 'none';
        }
        if (e.target === lyricsModal) {
            lyricsModal.style.display = 'none';
        }
        if (e.target === addSongModal) {
            addSongModal.style.display = 'none';
        }
    });
    
    // Equalizer modal
    equalizerBtn.addEventListener('click', () => {
        equalizerModal.style.display = 'flex';
        lyricsModal.style.display = 'none';
        addSongModal.style.display = 'none';
        settingsModal.style.display = 'none';
    });
    
    closeEqualizer.addEventListener('click', () => {
        equalizerModal.style.display = 'none';
    });
    
    // Lyrics modal
    lyricsBtn.addEventListener('click', () => {
        lyricsModal.style.display = 'flex';
        equalizerModal.style.display = 'none';
        addSongModal.style.display = 'none';
        settingsModal.style.display = 'none';
    });
    
    closeLyrics.addEventListener('click', () => {
        lyricsModal.style.display = 'none';
    });
    
    // Add song modal
    addSongBtn.addEventListener('click', () => {
        addSongModal.style.display = 'flex';
        lyricsModal.style.display = 'none';
        equalizerModal.style.display = 'none';
        settingsModal.style.display = 'none';
    });
    
    closeAddSong.addEventListener('click', () => {
        addSongModal.style.display = 'none';
    });
    
    // Theme switcher
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const theme = btn.dataset.theme;
            document.body.className = `${theme}-theme`;
        });
    });
    
    // Volume setting
    document.getElementById('defaultVolume').addEventListener('input', (e) => {
        document.getElementById('volumeValue').textContent = `${Math.round(e.target.value * 100)}%`;
    });
    
    // Crossfade setting
    document.getElementById('crossfadeCheckbox').addEventListener('change', function() {
        const crossfadeSettings = document.getElementById('crossfadeSettings');
        if (this.checked) {
            crossfadeSettings.style.display = 'block';
            document.getElementById('crossfadeDuration').disabled = false;
            isCrossfadeEnabled = true;
        } else {
            crossfadeSettings.style.display = 'none';
            document.getElementById('crossfadeDuration').disabled = true;
            isCrossfadeEnabled = false;
        }
    });
    
    document.getElementById('crossfadeDuration').addEventListener('input', function() {
        document.getElementById('crossfadeValue').textContent = `${this.value}s`;
        crossfadeDuration = parseInt(this.value);
    });
    
    // Sleep timer setting
    document.getElementById('sleepTimer').addEventListener('change', function() {
        const customTimer = document.getElementById('customSleepTimer');
        if (this.value === 'custom') {
            customTimer.style.display = 'block';
            document.getElementById('customSleepTime').disabled = false;
        } else {
            customTimer.style.display = 'none';
            document.getElementById('customSleepTime').disabled = true;
            setSleepTimer(parseInt(this.value));
        }
    });
    
    document.getElementById('customSleepTime').addEventListener('change', function() {
        setSleepTimer(parseInt(this.value));
    });
    
    // Save settings
    saveSettings.addEventListener('click', () => {
        saveSettingsToStorage();
        
        // Update player state
        isShuffled = document.getElementById('shuffleCheckbox').checked;
        isLooping = document.getElementById('loopCheckbox').checked;
        isCrossfadeEnabled = document.getElementById('crossfadeCheckbox').checked;
        
        if (isShuffled) {
            shufflePlaylist();
        } else {
            unshufflePlaylist();
        }
        
        // Apply compact mode
        if (document.getElementById('compactModeCheckbox').checked) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
        
        settingsModal.style.display = 'none';
        showNotification('Settings saved');
    });
    
    // Reset settings
    resetSettings.addEventListener('click', resetSettingsToDefault);
    
    // Equalizer sliders
    eqSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const bandIndex = parseInt(this.dataset.band);
            const gainValue = parseInt(this.value);
            
            if (filters[bandIndex]) {
                filters[bandIndex].gain.value = gainValue;
            }
        });
    });
    
    // Equalizer presets
    eqPresetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const preset = this.dataset.preset;
            applyEqualizer(preset);
        });
    });
    
    // Reset equalizer
    resetEqualizer.addEventListener('click', () => {
        applyEqualizer('flat');
    });
    
    // Save equalizer
    saveEqualizer.addEventListener('click', () => {
        const settings = JSON.parse(localStorage.getItem('musicPlayerSettings')) || {};
        settings.equalizerPreset = document.getElementById('equalizerPreset').value;
        localStorage.setItem('musicPlayerSettings', JSON.stringify(settings));
        equalizerModal.style.display = 'none';
        showNotification('Equalizer settings saved');
    });
    
    // Shuffle button
    shuffleBtn.addEventListener('click', () => {
        if (isShuffled) {
            unshufflePlaylist();
        } else {
            shufflePlaylist();
        }
    });
    
    // Repeat button
    repeatBtn.addEventListener('click', toggleLoop);
    
    // Add song from URL
    addUrlSongBtn.addEventListener('click', addSongFromUrl);
    
    // File upload
    songUpload.addEventListener('change', function() {
        startUploadBtn.disabled = this.files.length === 0;
    });
    
    startUploadBtn.addEventListener('click', handleFileUpload);
    
    // Settings tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('enableHotkeysCheckbox').checked) return;
        
        switch (e.key) {
            case ' ':
                e.preventDefault();
                if (isPlaying) {
                    pauseSong();
                } else {
                    playSong();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSong();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevSong();
                break;
            case 'ArrowUp':
                e.preventDefault();
                audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
                volumeSlider.value = audioPlayer.volume;
                fullscreenVolumeSlider.value = audioPlayer.volume;
                break;
            case 'ArrowDown':
                e.preventDefault();
                audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
                volumeSlider.value = audioPlayer.volume;
                fullscreenVolumeSlider.value = audioPlayer.volume;
                break;
            case 'm':
            case 'M':
                e.preventDefault();
                audioPlayer.muted = !audioPlayer.muted;
                volumeSlider.value = audioPlayer.muted ? 0 : audioPlayer.volume;
                fullscreenVolumeSlider.value = audioPlayer.muted ? 0 : audioPlayer.volume;
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                if (fullscreenPlayer.style.display === 'flex') {
                    fullscreenPlayer.style.display = 'none';
                } else {
                    fullscreenPlayer.style.display = 'flex';
                }
                break;
        }
    });
    
    // Initialize the player
    init();
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: var(--light-text);
            padding: 12px 24px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .notification.fade-out {
            opacity: 0;
        }
        
        .compact-mode .now-playing {
            flex-direction: row;
            align-items: center;
            gap: 15px;
        }
        
        .compact-mode .album-art {
            width: 80px;
            height: 80px;
        }
        
        .compact-mode .song-info h2 {
            font-size: 1.2rem;
        }
        
        .compact-mode .song-info p {
            font-size: 0.9rem;
        }
        
        .compact-mode .controls button {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
        
        .compact-mode #playBtn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
        }
        
        .song-item .delete-song-btn {
            background: none;
            border: none;
            color: var(--secondary-color);
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
            padding: 5px;
            margin-left: auto;
        }
        
        .song-item .delete-song-btn:hover {
            opacity: 1;
            color: var(--error-color);
        }
    `;
    document.head.appendChild(style);
});