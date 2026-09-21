const fs = require('fs');

const transcriptFile = 'C:\\Users\\jser\\.gemini\\antigravity-ide\\brain\\e954293a-d329-497a-bb14-f3007aff60b2\\.system_generated\\logs\\transcript.jsonl';
if (fs.existsSync(transcriptFile)) {
    const lines = fs.readFileSync(transcriptFile, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        try {
            const data = JSON.parse(lines[i]);
            if (data.step_index >= 178 && data.step_index <= 185) {
                console.log(`=== STEP ${data.step_index} (${data.type}) ===`);
                if (data.content) console.log(data.content);
                if (data.tool_calls) {
                    for (const tc of data.tool_calls) {
                        console.log('Tool Call:', tc.name);
                        if (tc.args && tc.args.CodeContent) {
                            console.log('CodeContent:\n', tc.args.CodeContent);
                        } else if (tc.args) {
                            console.log('Args:', JSON.stringify(tc.args).substring(0, 500));
                        }
                    }
                }
            }
        } catch(e) {}
    }
}
