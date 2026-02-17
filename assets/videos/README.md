# Videos Folder

Store all your project videos here.

## Recommended Videos

### Project Videos
- `project-video-1.mp4`, `project-video-2.mp4`, etc.
- Recommended format: `.mp4` (best browser compatibility)
- Alternative formats: `.webm`, `.ogv`

## Video Guidelines

### Format and Codec
- **Container**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p) or 1280x720 (720p)
- **Frame Rate**: 30fps or 24fps
- **Bitrate**: 5-10 Mbps for good quality

### File Size Optimization
- Keep videos under 50MB when possible for faster loading
- Consider shorter clips for web display (30-120 seconds)
- Use video compression tools if needed:
  - HandBrake (free, cross-platform)
  - FFmpeg (command-line)
  - Online tools like CloudConvert

### Multiple Format Support
For best browser compatibility, you can provide multiple formats:
```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Your browser does not support the video tag.
</video>
```

## Alternative: Video Hosting
For large videos, consider hosting on:
- **YouTube** - Embed with iframe
- **Vimeo** - Professional hosting
- **Cloud storage** - Google Drive, Dropbox (with proper sharing settings)

### Example YouTube Embed
```html
<iframe width="560" height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
```

## Usage in Website
Videos are displayed in the project modal when users click "View Details" on a project card.
