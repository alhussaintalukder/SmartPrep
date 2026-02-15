# AI Interview Topic Creation Prompt Template

Use this prompt to create a new interview preparation topic with 100 questions.

---

## PROMPT TO USE:

```
Topic Name: [YOUR TOPIC NAME HERE]

Create a comprehensive interview preparation topic for [YOUR TOPIC NAME] with exactly 100 questions following these specifications:

## REQUIREMENTS:

### Content Quality (CRITICAL):
1. 100 questions total covering the MOST COMMON interview questions for [YOUR TOPIC NAME]
2. Questions must FULLY COVER the topic - from fundamentals to advanced concepts
3. Each question must include:
   - Clear, concise question text
   - Detailed answer with bullet points explaining key concepts
   - One-sentence explanation summarizing the answer
   - Difficulty level: "Easy", "Medium", or "Hard"
   - Practical code example (when applicable)
4. Do NOT use markdown bold syntax (no **text** or __text__)
5. Use bullet points (•) for lists in answers
6. Focus on concepts actually asked in real interviews

### File Structure (CRITICAL):
1. Create 20 separate files, each with exactly 5 questions
2. File naming: [topic-name]-part1.json, [topic-name]-part2.json, ..., [topic-name]-part20.json
3. Location: E:\projects\alhussain\SmartPrep\data\

### JSON Format (CRITICAL):

**Part 1 file ([topic-name]-part1.json):**
```json
{
  "topic": "[Topic Display Name]",
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "answer": "Main answer with key points:\n\nSection Title:\n• Bullet point 1\n• Bullet point 2\n• Bullet point 3\n\nAnother Section:\n• Point 1\n• Point 2",
      "explanation": "One-sentence summary of the answer explaining the core concept.",
      "difficulty": "Easy",
      "code": "// Code example here\nconst example = 'value';\nconsole.log(example);"
    },
    {
      "id": 2,
      ...
    },
    {
      "id": 3,
      ...
    },
    {
      "id": 4,
      ...
    },
    {
      "id": 5,
      "question": "...",
      "answer": "...",
      "explanation": "...",
      "difficulty": "Easy"
    },
```
CRITICAL: Part 1 ends with `},` after question 5 (NOT `}],` - no closing brackets!)

**Part 2-19 files ([topic-name]-part2.json through [topic-name]-part19.json):**
```json
    {
      "id": 6,
      "question": "...",
      "answer": "...",
      "explanation": "...",
      "difficulty": "Medium",
      "code": "..."
    },
    {
      "id": 7,
      "question": "...",
      "answer": "...",
      "explanation": "...",
      "difficulty": "Medium"
    },
    {
      "id": 8,
      ...
    },
    {
      "id": 9,
      ...
    },
    {
      "id": 10,
      "question": "...",
      "answer": "...",
      "explanation": "...",
      "difficulty": "Medium",
      "code": "..."
    },
```
CRITICAL NOTES:
- NO opening `{` or `"topic"` property at start
- Each question object ends with `},` (closing brace + comma)
- The LAST question in the file (Q10, Q15, Q20, etc.) also ends with `},` (NOT `}`)
- NO closing `],` brackets at end of file
- NO extra newlines with orphan commas
- File must end immediately after the comma of the last question: `...}\n    },`

**Part 20 file ([topic-name]-part20.json):**
```json
    {
      "id": 96,
      ...
    },
    {
      "id": 97,
      ...
    },
    {
      "id": 98,
      ...
    },
    {
      "id": 99,
      ...
    },
    {
      "id": 100,
      "question": "...",
      "answer": "...",
      "explanation": "...",
      "difficulty": "Hard",
      "code": "..."
    }
  ]
}
```
Note: Closing brackets `]}` to complete the JSON structure

### Question ID Mapping:
- Part 1: Q1-Q5
- Part 2: Q6-Q10
- Part 3: Q11-Q15
- Part 4: Q16-Q20
- Part 5: Q21-Q25
- Part 6: Q26-Q30
- Part 7: Q31-Q35
- Part 8: Q36-Q40
- Part 9: Q41-Q45
- Part 10: Q46-Q50
- Part 11: Q51-Q55
- Part 12: Q56-Q60
- Part 13: Q61-Q65
- Part 14: Q66-Q70
- Part 15: Q71-Q75
- Part 16: Q76-Q80
- Part 17: Q81-Q85
- Part 18: Q86-Q90
- Part 19: Q91-Q95
- Part 20: Q96-Q100

### After Creating All 20 Files:

1. **Merge files into single JSON:**
   ```powershell
   cd E:\projects\alhussain\SmartPrep\data
   1..20 | ForEach-Object { Get-Content "[topic-name]-part$_.json" } | Set-Content "[topic-name].json" -Encoding UTF8
   ```
   IMPORTANT: Change to data directory first, then use relative paths!

2. **Verify merged file is valid JSON:**
   ```powershell
   cd E:\projects\alhussain\SmartPrep\data
   Get-Content "[topic-name].json" | ConvertFrom-Json | Out-Null
   Write-Host "JSON is valid!"
   ```
   If this command succeeds without errors, the JSON is valid.

3. **Verify question count:**
   ```powershell
   cd E:\projects\alhussain\SmartPrep\data
   (Get-Content "[topic-name].json" | ConvertFrom-Json).questions.Count
   ```
   Should output: 100

4. **Verify question IDs are sequential 1-100:**
   ```powershell
   cd E:\projects\alhussain\SmartPrep\data
   $data = Get-Content "[topic-name].json" | ConvertFrom-Json; $ids = $data.questions | ForEach-Object { $_.id }; $missing = 1..100 | Where-Object { $_ -notin $ids }; if ($missing) { "Missing: $missing" } else { "All IDs 1-100 present" }
   ```
   Should output: "All IDs 1-100 present"

5. **ONLY AFTER verification succeeds, add to script.js:**
   In E:\projects\alhussain\SmartPrep\script.js, add new topic to the topics array in appropriate position:
   ```javascript
   { id: '[topic-id]', name: '[Topic Display Name]', icon: '[emoji]', file: 'data/[topic-name].json' },
   ```
   Choose appropriate emoji for the topic.

6. **ONLY AFTER script.js is updated AND verified, delete part files:**
   ```powershell
   cd E:\projects\alhussain\SmartPrep\data
   Remove-Item "[topic-name]-part*.json"
   Write-Host "Part files deleted"
   ```

### Example Reference Files:
- Good examples: E:\projects\alhussain\SmartPrep\data\spring-framework.json
- Good examples: E:\projects\alhussain\SmartPrep\data\java.json
- Good examples: E:\projects\alhussain\SmartPrep\data\spring-boot.json

### Content Guidelines:

**Question Difficulty Distribution:**
- Easy: 30-35 questions (Q1-Q30 typically basics)
- Medium: 40-50 questions (Q31-Q75 intermediate concepts)
- Hard: 20-25 questions (Q76-Q100 advanced topics)

**Answer Format Rules:**
1. Start with brief overview or definition
2. Use section headings followed by colons (e.g., "Key Features:" or "Benefits:")
3. Use bullet points (•) for lists
4. Keep explanations practical and interview-focused
5. Avoid markdown formatting - use plain text with newlines and bullets
6. Include comparisons when relevant (e.g., "X vs Y")

**Code Example Guidelines:**
1. Keep code concise but complete
2. Include comments for clarity
3. Show practical, real-world usage
4. Use multiple languages when relevant (Java, JavaScript, Python, SQL, etc.)
5. Include configuration examples when applicable (XML, YAML, properties)
6. For questions without code examples, omit the "code" field entirely

**Topic Coverage Strategy:**
- Q1-Q10: Core fundamentals and definitions
- Q11-Q25: Essential features and basic usage
- Q26-Q40: Common patterns and best practices
- Q41-Q60: Advanced features and configurations
- Q61-Q75: Integration, testing, and optimization
- Q76-Q85: Complex scenarios and architecture
- Q86-Q95: Expert-level concepts and edge cases
- Q96-Q100: Latest features, trends, and comprehensive scenarios

### Quality Checklist:
- [ ] Exactly 100 questions created
- [ ] All questions commonly asked in interviews
- [ ] Topic fully covered from basics to advanced
- [ ] 20 files created with correct naming
- [ ] Part 1 has opening JSON structure `{ "topic": "...", "questions": [`
- [ ] **Part 1 ends with `},` (NOT `}],`)**
- [ ] **Parts 2-19 start directly with question objects (no opening braces)**
- [ ] **Parts 2-19 end with `},` after last question (NOT `],` or orphan `,`)**
- [ ] Part 20 has closing JSON structure `]}` after last question
- [ ] No markdown bold (**) used in content
- [ ] All question IDs sequential 1-100
- [ ] Each question has all required fields
- [ ] Code examples are practical and clear
- [ ] **Changed to data directory before running merge command**
- [ ] Files merged into single JSON successfully
- [ ] Merged file validated as proper JSON
- [ ] Question count verified as 100
- [ ] Added to script.js with appropriate icon
- [ ] Part files deleted after verification

### EXECUTION ORDER (CRITICAL - DO NOT SKIP STEPS):
1. Create all 20 part files (part1.json through part20.json)
2. Merge files using PowerShell command
3. Verify merged file with ConvertFrom-Json
4. Verify question count is 100
5. Verify all IDs 1-100 are present
6. ONLY if all verifications pass, add to script.js
7. ONLY after script.js updated, delete part files

### ERROR HANDLING:
- If merge fails: Check each part file for JSON syntax errors
- If question count wrong: Check for duplicate or missing IDs
- If IDs not sequential: Review each part file for correct ID ranges
- If validation fails: Do NOT delete part files, fix issues first
- If in doubt: Keep part files until absolutely certain merge is correct
- **If "Invalid property identifier" error**: Check for extra `],` at end of part1 or parts 2-19
- **If merge creates invalid JSON**: Verify no orphan commas or extra newlines at end of files
- **Use this to check file endings**: `(Get-Content "file.json" -Raw).Substring((Get-Content "file.json" -Raw).Length - 50)`

NOW, create the [YOUR TOPIC NAME] topic following ALL specifications above.
```

---

## USAGE INSTRUCTIONS:

1. Copy the entire prompt above (from "Topic Name:" to the end)
2. Replace `[YOUR TOPIC NAME HERE]` and `[YOUR TOPIC NAME]` with your desired topic
3. Replace all instances of `[topic-name]` with kebab-case topic name (e.g., "spring-boot", "react-hooks")
4. Replace `[Topic Display Name]` with the proper display name (e.g., "Spring Boot", "React Hooks")
5. Choose an appropriate emoji icon for the topic
6. Paste the modified prompt to the AI coding agent
7. Monitor the creation process and verify each step
8. Do not interrupt until all verifications complete

## TOPIC NAME FORMAT EXAMPLES:

| Display Name | topic-name (file) | id (script.js) |
|--------------|-------------------|----------------|
| Spring Boot | spring-boot | spring-boot |
| React Hooks | react-hooks | react-hooks |
| PostgreSQL | postgresql | postgresql |
| AWS Services | aws-services | aws-services |
| Design Patterns | design-patterns | design-patterns |

## COMMON MISTAKES TO AVOID:

1. ❌ Forgetting to verify JSON before deleting part files
2. ❌ Using markdown bold (**) in answers
3. ❌ Creating wrong number of questions per file
4. ❌ Missing opening/closing JSON structure
5. ❌ Skipping verification steps
6. ❌ Deleting part files before script.js is updated
7. ❌ Not checking for sequential question IDs
8. ❌ Inconsistent difficulty distribution
9. ❌ Generic questions not specific to the topic
10. ❌ Missing code examples for code-heavy topics
11. ❌ **CRITICAL**: Adding `],` (closing array bracket) at end of part 1 - should be just `},`
12. ❌ **CRITICAL**: Adding `],` at end of parts 2-19 - should be just `},`
13. ❌ **CRITICAL**: Adding extra newlines with orphan commas like `\n  ,` at end of files
14. ❌ Running merge commands from wrong directory (always cd to data directory first)

## SUCCESS CRITERIA:

✅ 100 questions created covering topic comprehensively
✅ All questions are interview-relevant
✅ Proper JSON structure validated
✅ Questions numbered 1-100 sequentially
✅ Topic added to script.js successfully
✅ Application loads topic without errors
✅ All 100 questions display correctly
✅ Code examples render properly
✅ No part files remaining after completion

---

**Last Updated:** February 12, 2026
**Success Rate:** Designed for 100% success when followed exactly
**Estimated Time:** 10-15 minutes per topic (for AI agent)
