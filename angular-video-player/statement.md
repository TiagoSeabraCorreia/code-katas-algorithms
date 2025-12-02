You are building the prototype of a reactive video player for a Portuguese startup working on ultra-low-latency on-demand coaching videos. The video is not delivered as a continuous MP4 stream. Instead, it arrives in asynchronous video chunks, each chunk containing a portion of raw frames.

There are two sources of video frames:

One source produces frames steadily at a fixed rate of 30 frames per second, simulating a local, stable decoder. Each emission contains exactly one frame and all frames have a timestamp representing the moment they should be displayed.

The second source produces bursts of 5 to 40 frames at unpredictable intervals of 1–4 seconds, representing a remote streaming backend that flushes encoded chunks in batches. Every frame in a burst shares the same “arrival timestamp” but each frame has its own “display timestamp”.m

Your job is to architect and implement the full reactive pipeline of this video engine, using only Angular and RxJS. You must merge the two streams of frames, flatten bursts, reorder frames based on their display timestamp, buffer upcoming frames into a sliding “playback buffer”, detect when the buffer is too small or too large, smooth playback timing, and expose a clean view model to the Angular template so it can render the video smoothly at ~30fps.

You must decide how to design the buffer, how much to prefetch, how to handle jitter, how to detect underflow (not enough buffered frames) and overflow (too many buffered frames), how to pace the UI updates so the browser isn't overloaded, how to reconcile burst arrivals with steady arrivals, how to guarantee display order, and how to prevent tearing or jumps.

The output of your RxJS pipeline is a single observable representing the current frame to display. The Angular template should simply render this frame into a <canvas> or <img> tag. You must use RxJS operators such as merge, mergeMap, scan, map, shareReplay, interval, filter, timestamp, sampleTime, and delayWhen, shaping them into a coherent, senior-level reactive architecture.

Your solution must handle real video constraints: frames must be shown in the correct temporal order, early frames must wait, late frames must be skipped, buffering must operate like a sliding window on the timeline, and the UI must never freeze. The mock data sources must simulate realistic video timing, including jitter, burst arrivals, and slight timing inconsistencies.

The focus of this kata is to build a reactive, time-aware, jitter-tolerant video pipeline using only RxJS streams and Angular. No external video APIs, no HTML5 <video> element. Just your reactive engine and a template that shows the current frame.

The kata ends when the player renders a smooth visual playback experience on the screen from your mock reactive data sources.