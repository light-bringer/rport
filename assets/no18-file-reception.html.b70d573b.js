import{_ as n,r as a,o as s,c as l,a as i,b as o,d as r,e}from"./app.150355ce.js";const d={},c=r(`<h1 id="file-reception" tabindex="-1"><a class="header-anchor" href="#file-reception" aria-hidden="true">#</a> File Reception</h1><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>Rport allows users to copy files from their local machines to one or many remote clients through the rport server. The most common use case is the distribution of software or configuration files.</p><p>As an alternative, users can write a script to download needed files from the Internet, but usually, we don&#39;t want the client machine downloading it directly because a virus scan must happen at a central place first.</p><p>A recommended solution would be to download the file in some workstation, do the necessary virus scans and checksum checks and then upload the file to the rport server. The latter will distribute it among the clients through the secure SSH connection:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    Browser | Rportcli | curl (you)
        file_xyz
------------------------- HTTP(s)        
           \u1401
       RPort server 
------------------------- SSH/SFTP  
    \u1401       \u1401       \u1401
   cl_1    cl_2    cl_n  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="data-flow" tabindex="-1"><a class="header-anchor" href="#data-flow" aria-hidden="true">#</a> Data flow</h2>`,7),h=e("The RPort administrator uploads a file to the RPort server by using "),u={href:"https://apidoc.rport.io/master/#tag/Upload",target:"_blank",rel:"noopener noreferrer"},p=e("UPLOAD API"),f=e(". With the file, he provides all required information: target file path on client, list of client IDs or group IDs, desired file mode, owner/group etc."),m=r("<li>The RPort server copies the file to a temporary folder <code>[server] {data_dir}/filepush/xxx</code>, where <code>[server] data_dir</code> is a configuration option and xxx is a random unique file name generated by the Rport server.</li><li>The RPort server sends to the provided clients a lightweight JSON request via the established and secured SSH connections. The request contains a temporary file location on the server as well as all other details (target path, checksum, desired file mode and owner etc) needed for the file operations on the client.</li><li>The RPort client(s) opens an SFTP session on top of the existing SSH connection and downloads the file to a temporary location <code>[client] {data_dir}/filepush/xxx</code>, where <code>[client] {data_dir}</code> is the client configuration option and xxx is a unique file name generated by the Rport server.</li><li>If the SFTP session succeeds, the client checks the md5 hash of the actual file against the provided checksum, chowns and chmods the file (for Unix only) if needed and finally moves it to the target location.</li><li>If the file already exists, and force and sync flags are false, rport client will do nothing.</li><li>If force flag is true, the existing file will be removed and replaced by the provided one</li><li>If sync flag is true, the rport client will compare md5 hash of the existing file with the new one, and will overwrite it if they don&#39;t match. Additionally, it will apply chmod/chown operations if needed.</li><li>Successes or failures of file operations will be sent to the server via the established SSH connection.</li><li>The server will track the successes or failures on the clients and will report them to all websocket listeners.</li><li>Finally, it will remove the temporary file.</li>",10),v=i("h2",{id:"upload-api",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#upload-api","aria-hidden":"true"},"#"),e(" Upload API")],-1),b=e("You can use "),g={href:"https://apidoc.rport.io/master/#tag/Upload",target:"_blank",rel:"noopener noreferrer"},w=e("UPLOAD API"),_=e(" to upload a file to a Rport server."),x=e("JSON API is not well suited for uploading files, so you need to use the "),y={href:"https://en.wikipedia.org/wiki/MIME#Multipart_messages",target:"_blank",rel:"noopener noreferrer"},q=e("multipart form data format"),I=e("."),k=r(`<p>The file itself is marked with the required <code>upload</code> key.</p><p>Additionally, users should provide the following information as additional key/value parts of the multipart request:</p><h3 id="client-id" tabindex="-1"><a class="header-anchor" href="#client-id" aria-hidden="true">#</a> client_id</h3><p><em>(string optional)</em></p><p>ID of a client who should receive the file. You can repeat <code>client</code> part to send a file to multiple clients.</p><h3 id="group-id" tabindex="-1"><a class="header-anchor" href="#group-id" aria-hidden="true">#</a> group_id</h3><p><em>(string optional)</em></p><p>Client group ID where server should place the uploaded file. You can repeat group IDs to indicate multiple client groups.</p><h3 id="dest" tabindex="-1"><a class="header-anchor" href="#dest" aria-hidden="true">#</a> dest</h3><p><em>(string required)</em></p><p>Absolute path with the file name, showing the desired location of the uploaded file on the client(s).</p><h3 id="force" tabindex="-1"><a class="header-anchor" href="#force" aria-hidden="true">#</a> force</h3><p><em>(bool, optional, default false)</em></p><p>By default, ff the target file exists, Rport client will skip the upload request. By providing force flag you require rport to overwrite the target file no matter if it exists or not.</p><h3 id="sync" tabindex="-1"><a class="header-anchor" href="#sync" aria-hidden="true">#</a> sync</h3><p><em>(bool, optional, default false)</em></p><p>The sync flag is taken into account only if the target file already exists. The Rport client will do the following:</p><ul><li>if the md5 of the provided file doesn&#39;t match the md5 hash of the existing file, it will be overwritten by the new file</li><li>if file mode parameter is provided (see below), the file mode of the target file will be changed to this value (for Unix only)</li><li>if either user or group parameters is provided (see below) and the existing file has a different owner or group, Rport client will apply a <code>chown</code> operation to it to change owner and group attributes (for Unix only)</li><li>if a destination file doesn&#39;t exist, the file will be copied to the destination as mentioned before</li></ul><h3 id="mode" tabindex="-1"><a class="header-anchor" href="#mode" aria-hidden="true">#</a> mode</h3><p><em>(string, optional, default empty, for Unix only)</em></p><p>Indicates the desired file mode of the target file. If no target file exists, rport client will create a temp file with the provided mode. If no mode is provided, the default value will be 0764. When rport moves the temp file to the destination with it&#39;s mode. If target file already exists and the sync flag is true, rport client will explicitly change mode of the target file to the provided value.</p><h3 id="user-group" tabindex="-1"><a class="header-anchor" href="#user-group" aria-hidden="true">#</a> user/group</h3><p><em>(string, optional, default empty, for Unix only)</em></p><p>Indicates the desired file owner and group of the target file. If nothing is given, the current Rport client user and his default group will be used.</p><p>If no target file exists, rport will create a temp file with the current user and his default group. Then it will do the chown operation on the temp file. Then rport client will move the temporary file to the target path along with its owner and group attributes.</p><p>If target file exists and sync flag is true, rport client will explicitly call chown operation on the target file.</p><p>Please note, that on Unix the rport client runs with unprivileged rights. Changing the ownership of a file and moving a file to folders with restricted write access requires sudo rights. The user must create sudo rules for that. This allows a fine-grained control over which folders are accessible for the rport client. Example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># /etc/sudoers.d/rport-filereception
# The following rule allows the rport client to change the ownership of any file retrieved from the rport server
rport ALL=NOPASSWD: /usr/bin/chown * /var/lib/rport/filepush/*_rport_filepush

# The following rules allows the rport client to move copied files to any folder
rport ALL=NOPASSWD: /usr/bin/mv /var/lib/rport/filepush/*_rport_filepush *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="example-for-a-file-upload-via-curl-with-all-parameters-provided" tabindex="-1"><a class="header-anchor" href="#example-for-a-file-upload-via-curl-with-all-parameters-provided" aria-hidden="true">#</a> Example for a file upload via curl with all parameters provided:</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -XPOST \\
-H &#39;Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFwIiwic2NvcGVzIjpbeyJ1cmkiOiIqIiwibWV0aG9kIjoiKiJ9LHsidXJpIjoiL2FwaS92MS92ZXJpZnktMmZhIiwibWV0aG9kIjoiKiIsImV4Y2x1ZGUiOnRydWV9XSwianRpIjoiMTMxNDEzNTcxNTgxNjk5Njk3MDAifQ.az3I9cod3CAuUOi1UF7c9iECIH__RLELYTPO7_V04wk&#39; \\ 
-F &#39;upload=@/home/myuser/some-file.txt&#39; \\
-F &#39;client_id=89C4AB76-D90A-555C-85BF-9F8770A3036F&#39; \\
-F &#39;client_id=b4f795ef-718f-4f69-8f6f-b304b38a904f&#39; \\
-F &#39;dest=/Users/hero/Projects/rport/dist/data/client/some-file.txt&#39; \\
-F &#39;force=true&#39; \\
-F &#39;sync=true&#39; \\
-F &#39;mode=0744&#39; \\
-F &#39;user=hero&#39; \\ 
-F &#39;group=staff&#39; \\ 
http://localhost:3000/api/v1/files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tracking-upload-results" tabindex="-1"><a class="header-anchor" href="#tracking-upload-results" aria-hidden="true">#</a> Tracking upload results</h2><p>Sending a file to the rport server is performed as a synchronous atomic operation. It means if the transfer has failed, the whole operation will be rejected. Similarly, if the server cannot perform some file operations e.g. because of insufficient permissions, the whole file will be discarded.</p><p>However, distribution of a large file among multiple clients might take a while so there is no reason for the user to wait for it. Therefore, the Rport server will respond with success information once the upload operation completes. This doesn&#39;t mean, that the distribution to the given clients was successful too.</p>`,33),T=e("If you want to track upload process in real time, you can use a websocket API "),A={href:"https://apidoc.rport.io/master/#operation/WsUploadsGet",target:"_blank",rel:"noopener noreferrer"},F=e("our testing API for Websockets"),P=e(" similar to commands websocket API."),S=r(`<p>You can also use our sandbox interface to play with the upload websocket API. First, enable testing endpoints by setting <code>enable_ws_test_endpoints</code> flag to true in the <code>[server]</code> section of the configuration file:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[server]
...
  enable_ws_test_endpoints = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Restart Rport server and go to: <code>{YOUR_RPORT_ADDRESS}/api/v1/test/uploads/ui</code></p><p>Put an access token in the corresponding field.</p><p>Click Open to start websocket connection.</p><p>The websocket API will give you information about all uploads happening after you open a ws connection.</p><p>Here is an example payload you&#39;re usually getting through the ws upload API:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;client_id&quot;: &quot;89C4AB76-D90A-555C-85BF-9F8770A3036F&quot;,
  &quot;uuid&quot;: &quot;482ae29e-d372-4d21-8cb4-58d75482b7e1&quot;,
  &quot;filepath&quot;: &quot;/target/file.txt&quot;,
  &quot;size&quot;: 17118,
  &quot;message&quot;: &quot;file successfully copied to destination&quot;,
  &quot;status&quot;: &quot;success&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This message says that the client <code>89C4AB76-D90A-555C-85BF-9F8770A3036F</code> downloaded the 17118 bytes of a file and placed it to the destination path <code>/target/file.txt</code>. The <code>uuid</code> parameter indicates a unique request id, that you also received once file was uploaded to the server.</p><p>Similarly, errors or warnings will be reported in the same format, e.g.:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;client_id&quot;: &quot;89C4AB76-D90A-555C-85BF-9F8770A3036F&quot;,
  &quot;uuid&quot;: &quot;2ea7863b-94ae-4a91-87de-a85bc105ad4e&quot;,
  &quot;filepath&quot;: &quot;&quot;,
  &quot;size&quot;: 0,
  &quot;message&quot;: &quot;rename /data/filepush/2ea7863b-94ae-4a91-87de-a85bc105ad4e_rport_filepush /etc/lala.txt: permission denied&quot;,
  &quot;status&quot;: &quot;error&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This message tells about the failure of a rename/move operation because of permission denied error.</p><p>The websocket API will deliver upload results at real time but only those which happened after the websocket connection was opened as rport server doesn&#39;t store upload results for this use case. If you need this information, use audit logs for that.</p><p>Uploads for all clients and all requests will be delivered to the same websocket. Server won&#39;t close the ws connection like it happens with the commands websockets.</p><h2 id="file-reception-restrictions" tabindex="-1"><a class="header-anchor" href="#file-reception-restrictions" aria-hidden="true">#</a> File reception restrictions</h2><p>By default, Rport client can place files anywhere in the file system where the rport OS user is allowed to write files.</p><p>That means, that running rport as sudo user, will give write access to the whole filesystem on the client (for Unix only).</p><p>However, by default rport won&#39;t allow uploading files to the following folders <code>[&#39;/bin&#39;, &#39;/sbin&#39;, &#39;/boot&#39;, &#39;/usr/bin&#39;, &#39;/usr/sbin&#39;, &#39;/dev&#39;, &#39;/lib*&#39;, &#39;/run&#39;]</code> for Unix and <code>[&#39;C:\\Windows\\&#39;, &#39;C:\\ProgramData&#39;]</code> for Windows</p>`,18),R=e("The denied folders list are defined as a list of "),C={href:"https://en.wikipedia.org/wiki/Glob_(programming)",target:"_blank",rel:"noopener noreferrer"},U=e("glob patterns"),D=e(" in the "),B=i("code",null,"[file-reception] protected",-1),O=e(" configuration section of an rport client."),W=r('<p>The restriction is applied for both target directory or target file path. Here is the list of examples to demonstrate this:</p><ul><li><code>/bin</code> rejects the target paths like <code>/bin/yourfile.txt</code>, <code>/bin/somefile.csv</code> but not <code>/etc/bin/yourfile.txt</code></li><li><code>C:\\Windows\\*.exe</code> rejects the target paths like <code>C:\\Windows\\myfancy_program.exe</code>, <code>C:\\Windows\\notepad.exe</code> but not <code>C:\\Windows\\myfancy_program.txt</code> or <code>C:\\Windows\\notepad.md</code></li></ul><h2 id="file-size-limit" tabindex="-1"><a class="header-anchor" href="#file-size-limit" aria-hidden="true">#</a> File size limit</h2><p>you can limit the size of uploaded files in bytes by setting <code>max_filepush_size</code> parameter in <code>[server]</code> section of rport server configuration. By default, this limit is 10485760 bytes (ca 10,5 MB).</p><h2 id="disabling-file-reception-on-the-client" tabindex="-1"><a class="header-anchor" href="#disabling-file-reception-on-the-client" aria-hidden="true">#</a> Disabling file reception on the client</h2><p>The file reception is enabled on the client by default. If you want to disable it, set <code>[file-reception] enabled</code> flag to false in the client config.</p>',6);function N(z,H){const t=a("ExternalLinkIcon");return s(),l("div",null,[c,i("ul",null,[i("li",null,[h,i("a",u,[p,o(t)]),f]),m]),v,i("p",null,[b,i("a",g,[w,o(t)]),_]),i("p",null,[x,i("a",y,[q,o(t)]),I]),k,i("p",null,[T,i("a",A,[F,o(t)]),P]),S,i("p",null,[R,i("a",C,[U,o(t)]),D,B,O]),W])}var V=n(d,[["render",N],["__file","no18-file-reception.html.vue"]]);export{V as default};
