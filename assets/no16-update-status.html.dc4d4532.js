import{_ as e,o as s,c as n,d as a}from"./app.150355ce.js";const t={},o=a(`<h1 id="supervising-the-update-status-patch-level" tabindex="-1"><a class="header-anchor" href="#supervising-the-update-status-patch-level" aria-hidden="true">#</a> Supervising the update status (patch level)</h1><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>Starting with version 0.3 the rport client can fetch a list of pending updates for the underlying operating system. The summary is sent to the RPort server. This allows you to supervise the patch level of a large number of machines from a central place. On the RPort server API each client will contain an <code>update_status</code> object that contains data as shown in the example below.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token property">&quot;updates_status&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;refreshed&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2021-08-16T06:45:56.485091025Z&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;updates_available&quot;</span><span class="token operator">:</span> <span class="token number">109</span><span class="token punctuation">,</span>
    <span class="token property">&quot;security_updates_available&quot;</span><span class="token operator">:</span> <span class="token number">41</span><span class="token punctuation">,</span>
    <span class="token property">&quot;update_summaries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;login&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;login 1:4.8.1-1ubuntu5.20.04.1 Ubuntu:20.04/focal-updates [amd64]&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reboot_required&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;is_security_update&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;libatomic1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;libatomic1 10.3.0-1ubuntu1~20.04 Ubuntu:20.04/focal-updates, Ubuntu:20.04/focal-security [amd64]&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reboot_required&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;is_security_update&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reboot_pending&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="supported-operating-systems" tabindex="-1"><a class="header-anchor" href="#supported-operating-systems" aria-hidden="true">#</a> Supported operating systems</h2><p>The following operating systems are supported for the update status supervision:</p><ul><li>Ubuntu and Debian by using <code>apt-get</code></li><li>RedHat, CentOs, and derivates by using <code>yum</code> or <code>dnf</code></li><li>SuSE by using <code>zypper</code></li><li>Microsoft Windows by using the Windows Update Manager</li></ul><h2 id="enable-disable" tabindex="-1"><a class="header-anchor" href="#enable-disable" aria-hidden="true">#</a> Enable/disable</h2><p>Fetching the update status is enabled by default. In the <code>[client]</code> section, you will find a block as shown in the <code>rport.conf</code> file.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>## Supervision and reporting of the pending updates (patch level)
## Rport can constantly summarize pending updates and
## make that summary available on the rport server.
## On Debian/Ubuntu and SuSE Linux sudo rules are needed.
## https://oss.rport.io/docs/no16-update-status.html
## How often after the rport client has started pending updates are summarized
## Set 0 to disable.
## Supported time units: h (hours), m (minutes)
## Default: updates_interval = &#39;4h&#39;
#updates_interval = &#39;4h&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Setting <code>updates_interval = &#39;0&#39;</code> disables the feature. Triggering a manual refresh of the update status is prevented this way too.</p><h2 id="sudo-rules" tabindex="-1"><a class="header-anchor" href="#sudo-rules" aria-hidden="true">#</a> Sudo rules</h2><p>On some Linux distributions, only the root user is allowed to look for pending updates. Because the rport client runs with its own unprivileged users, sudo rules are needed.</p><h3 id="debian-and-ubuntu" tabindex="-1"><a class="header-anchor" href="#debian-and-ubuntu" aria-hidden="true">#</a> Debian and Ubuntu</h3><p>Create a file <code>/etc/sudoers.d/rport-update-status</code> with the following content:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rport ALL=NOPASSWD: SETENV: /usr/bin/apt-get update -o Debug\\:\\:NoLocking=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="suse-linux" tabindex="-1"><a class="header-anchor" href="#suse-linux" aria-hidden="true">#</a> SuSE Linux</h3><p>Create a file <code>/etc/sudoers.d/rport-update-status</code> with the following content:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rport ALL=NOPASSWD: SETENV: /usr/bin/zypper refresh *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,19),i=[o];function p(r,u){return s(),n("div",null,i)}var d=e(t,[["render",p],["__file","no16-update-status.html.vue"]]);export{d as default};