window.onload = () => {
  let codeSnippetButtons;

  const options = {
    // the selector for the badge template
    templateSelector: '#CodeBadgeTemplate',

    // base content CSS selector that is searched for snippets
    contentSelector: 'body',

    // Delay in ms used for `setTimeout` before badging is applied
    // Use if you need to time highlighting and badge application
    // since the badges need to be applied afterwards.
    // 0 - direct execution (ie. you handle timing
    loadDelay: 0,

    // CSS class(es) used to render the copy icon.
    copyIconClass: 'fa fa-copy',
    // optional content for icons class (<i class="fa fa-copy"></i> or <i class="material-icons">file_copy</i>)
    copyIconContent: '',

    // CSS class(es) used to render the done icon.
    checkIconClass: 'fa fa-check-circle text-success',
    checkIconContent: '',

    // function called before code is placed on clipboard that allows you inspect and modify
    // the text that goes onto the clipboard. Passes text and code root element (hljs).
    // Example:  function(text, codeElement) { return text + " $$$"; }
    onBeforeCodeCopied: function (text, codeElement) {
      if (!codeSnippetButtons) {
        codeSnippetButtons = document.getElementsByClassName('code-badge');
      }

      const codeSnippetPosition =
        Array.prototype.indexOf.call(
          codeSnippetButtons,
          codeElement.previousSibling,
        ) + 1;

      window.AnalyticsClient.trackAction('docs-copy-code-clicked', {
        page: location.pathname,
        codeSnippetPosition,
      });

      return text;
    },
  };
  window.highlightJsBadge(options);

  if (!codeSnippetButtons) {
    codeSnippetButtons = document.getElementsByClassName('code-badge');
  }

  const eventType = `${window.PointerEvent ? 'pointer' : 'mouse'}down`;
  codeSnippetButtons.forEach((btn) => {
    btn.addEventListener(eventType, (e) => {
      if (e.button == 0) {
        btn.setAttribute('id', 'code-badge-clicked');

        /**
         * same as https://github.com/RickStrahl/highlightjs-badge/blob/7c395a9758a72fec2d24e4086fa94a511aa609a3/highlightjs-badge.js#L288
         * but there isn't an argument in the highlightJS interface to add
         * functionality to the setTimeout.
         */
        setTimeout(() => {
          btn.removeAttribute('id', 'code-badge-clicked');
        }, 2000);
      }
    });
  });
};
