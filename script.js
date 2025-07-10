const wrapper = document.querySelector('.wrapper')
    musicImg = wrapper.querySelector('img'),
    musicName = wrapper.querySelector('.name'),
    musicArtist = wrapper.querySelector('.artist'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    mainAudio = wrapper.querySelector('#main-audio'),
    progressArea = wrapper.querySelector('.progress-area'),
    progressBar = wrapper.querySelector('.progress-bar')

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1)
isMusicPaused = true

window.addEventListener('load', () => {
    loadMusic(musicIndex)
    mainAudio.addEventListener('loadeddata', () => {
        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if(totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`
    })
})

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name
    musicArtist.innerText = allMusic[indexNumb - 1].artist
    musicImg.src = allMusic[indexNumb - 1].img ? `assets/img/${allMusic[indexNumb - 1].img}.jpeg` : ''
    mainAudio.src = `assets/musics/${allMusic[indexNumb - 1].src}.mp3`
    mainAudio.load()
}

function playMusic() {
    wrapper.classList.add('paused')
    musicImg.classList.add('rotate')
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
    mainAudio.play()
}

function pauseMusic() {
    wrapper.classList.remove('paused')
    musicImg.classList.remove('rotate')
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
    mainAudio.pause()
}

function prevMusic() {
    musicIndex--
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

function nextMusic() {
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

playPauseBtn.addEventListener('click', () => {
    const isMusicPlay = wrapper.classList.contains('paused')
    if(isMusicPlay) {
        pauseMusic()
    } else {
        playMusic()
    }
})

prevBtn.addEventListener('click', () => {
    musicIndex--
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
})

nextBtn.addEventListener('click', () => {
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
})

let musicCurrentTime = wrapper.querySelector('.current-time')
let musicDuration = wrapper.querySelector('.max-duration')

mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if(currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

progressArea.addEventListener('click', (e) => {
    let progressWidthVal = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration
    playMusic()
})

mainAudio.addEventListener('ended', () => {
    nextMusic()
})