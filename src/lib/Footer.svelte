<script>
  // You can override iframeSrc if you want to test an alternate URL
  export let iframeSrc = "//acceptable.a-ads.com/2409400/?size=Adaptive";
</script>

<footer class="ad-footer" role="contentinfo" aria-label="Advertisement footer">
  <div id="frame">
    <iframe
      data-aa="2409400"
      src={iframeSrc}
      title="Advertisement"
      loading="lazy"
      style="border:0; padding:0;"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</footer>

<style>
  .ad-footer {
    width: 100%;
    margin-top: auto;
  }

  #frame {
    width: 100%;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.50);
    position: relative;
    z-index: 99998;
    padding: 12px 0;
    box-sizing: border-box;
  }

  /* Make iframe responsive and centered */
  #frame iframe {
    display: block;
    margin: 0 auto;
    width: 70%;
    max-width: 980px;
    min-width: 200px;
    height: 90px; /* set a reasonable default height for the ad */
    overflow: hidden;
  }

  @media (max-width: 600px) {
    #frame iframe {
      width: 95%;
      height: 120px;
    }
  }
</style>