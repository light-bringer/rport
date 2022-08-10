import{_ as r,r as i,o as c,c as u,a as e,b as n,w as a,d as o,e as t}from"./app.150355ce.js";const h={},p=o(`<h1 id="client-authentication" tabindex="-1"><a class="header-anchor" href="#client-authentication" aria-hidden="true">#</a> Client Authentication</h1><p>The Rportd can read client auth credentials from three different sources.</p><ol><li>A &quot;hardcoded&quot; single credentail pair</li><li>A file with client credentials</li><li>A database table</li></ol><p>Which one you choose is an either-or decision. A mixed-mode is not supported.</p><p>If you select option 2 or 3 client access and the needed credentials can be managed through the API and the UI.</p><h2 id="using-a-static-credential" tabindex="-1"><a class="header-anchor" href="#using-a-static-credential" aria-hidden="true">#</a> Using a static credential</h2><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>A single static clientauthid-password pair is not recommended for productive use. If all your clients use the same credential you cannot expire clients individually. If the password falls into wrong hands you must reconfigure all your clients.</p></div><p>To use just a single pair consisting of a client-auth-id and a password enter the following line to the server config(<code>rportd.config</code>) in the <code>[server]</code> section.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>auth = &quot;rport:a-strong-password12345&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Make sure no other auth option is enabled. Reload rportd to activate the changes. Quite simple. Now you can run a client using the client-auth-id <code>rport</code> and the password <code>a-strong-password12345</code>. It can be done in three ways:</p><ol><li>Use a command arg: <code>--auth rport:a-strong-password12345</code></li><li>Enter the following line to the client config(<code>rport.config</code>) in the <code>[client]</code> section.</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>auth = &quot;rport:a-strong-password12345&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>Alternatively, export credentials to the environment variable <code>RPORT_AUTH</code>.</li></ol><p>NOTE: if multiple options are enabled the following precedence order is used. Each item takes precedence over the item below it:</p><ol><li>a command arg;</li><li>config value;</li><li>env var.</li></ol><h2 id="using-a-file" tabindex="-1"><a class="header-anchor" href="#using-a-file" aria-hidden="true">#</a> Using a file</h2><p>If you want to have more than one credential, create a json file with the following structure.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;clientAuth1&quot;: &quot;1234&quot;,
    &quot;admin&quot;:       &quot;123456&quot;,
    &quot;client1&quot;:     &quot;yienei5Ch&quot;,
    &quot;client2&quot;:     &quot;ieRi1Noo2&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using <code>/var/lib/rport/client-auth.json</code> is a good choice.</p><p>Enter the following line to your <code>rportd.config</code> in the <code>[server]</code> section.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>auth_file = &quot;/var/lib/rport/client-auth.json&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Make sure no other auth option is enabled. Reload rportd to activate the changes.</p><p>The file is read only on start. Changes to the file, while rportd is running, have no effect.</p><p>If you want to manage the client authentication through the API make sure the auth file is writable by the rport user for example by executing <code>chown rport /var/lib/rport/client-auth.json</code>.</p><h2 id="using-a-database-table" tabindex="-1"><a class="header-anchor" href="#using-a-database-table" aria-hidden="true">#</a> Using a database table</h2><p>Clients auth credentials can be read from and written to a database table.</p>`,26),v=t("To use the database client authentication you must set up a global database connection in the "),m=e("code",null,"[database]",-1),b=t(" section of "),g=e("code",null,"rportd.conf",-1),f=t(" first. Only MySQL/MariaDB and SQLite3 are supported at the moment. The "),_={href:"https://github.com/cloudradar-monitoring/rport/blob/master/rportd.example.conf",target:"_blank",rel:"noopener noreferrer"},q=t("example config"),x=t(" contains all explanations on how to set up the database connection."),w=e("p",null,"The tables must be created manually.",-1),y=e("div",{class:"language-mysql ext-mysql line-numbers-mode"},[e("pre",{class:"language-mysql"},[e("code",null,"CREATE TABLE `clients_auth` (\n  `id` varchar(100) PRIMARY KEY,\n  `password` varchar(100) NOT NULL\n) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),A=e("div",{class:"language-sqlite ext-sqlite line-numbers-mode"},[e("pre",{class:"language-sqlite"},[e("code",null,"CREATE TABLE `clients_auth` (\n  `id` varchar(100) PRIMARY KEY,\n  `password` varchar(100) NOT NULL\n);\n")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),T=o(`<p>Having the database set up, enter the following to the <code>[server]</code> section of the <code>rportd.conf</code> to specify the table names.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>auth_table = &quot;clients_auth&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Reload rportd to apply all changes.</p><h2 id="manage-client-credentials-via-the-api" tabindex="-1"><a class="header-anchor" href="#manage-client-credentials-via-the-api" aria-hidden="true">#</a> Manage client credentials via the API</h2>`,4),I=t("The "),E={href:"https://apidoc.rport.io/master/#tag/Rport-Client-Auth-Credentials",target:"_blank",rel:"noopener noreferrer"},C=e("code",null,"/clients-auth",-1),R=t(" endpoint"),N=t(" allows you to manage clients and credentials through the API. This option is disabled if you use a single static clientauthid-password pair. If you want to delegate the management of client auth credentials to a third-party app writing directly to the auth-file or the database, consider turning the endpoint off by activating the following lines in the "),L=e("code",null,"rportd.conf",-1),k=t("."),P=o(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>## If you want to delegate the creation and maintenance to an external tool
## you should turn {auth_write} off.
## The API will reject all writing access to the client auth with HTTP 403.
## Applies only to auth_file and auth_table
## Default: true
auth_write = false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>List all client auth credentials.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/clients-auth|jq
{
  &quot;data&quot;: [
    {
      &quot;id&quot;: &quot;clientAuth1&quot;,
      &quot;password&quot;: &quot;1234&quot;
    },
    {
      &quot;id&quot;: &quot;client1&quot;,
      &quot;password&quot;: &quot;yienei5Ch&quot;
    },
    {
      &quot;id&quot;: &quot;client2&quot;,
      &quot;password&quot;: &quot;ieRi1Noo2&quot;
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Add a new client auth credentials</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/clients-auth&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;id&quot;:&quot;client3&quot;,
    &quot;password&quot;:&quot;hase243345&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function U(j,M){const s=i("ExternalLinkIcon"),l=i("CodeGroupItem"),d=i("CodeGroup");return c(),u("div",null,[p,e("p",null,[v,m,b,g,f,e("a",_,[q,n(s)]),x]),w,n(d,null,{default:a(()=>[n(l,{title:"MySQL"},{default:a(()=>[y]),_:1}),n(l,{title:"SQLite3"},{default:a(()=>[A]),_:1})]),_:1}),T,e("p",null,[I,e("a",E,[C,R,n(s)]),N,L,k]),P])}var S=r(h,[["render",U],["__file","no03-client-auth.html.vue"]]);export{S as default};