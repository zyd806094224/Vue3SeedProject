#!/bin/bash

# ============================================================
# Claude Code PostToolUse Hook: 自动添加/更新文件头注释
# 适用文件：.vue / .js
# ============================================================

AUTHOR="zhaoyudong"
FILE_PATH=$(jq -r '(.tool_input.file_path // .tool_input.path // empty)')

# 只处理 .vue 和 .js 文件
if [[ ! "$FILE_PATH" =~ \.(vue|js)$ ]]; then
    exit 0
fi

if [ ! -f "$FILE_PATH" ]; then
    exit 0
fi

CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")

if grep -q "@Author:" "$FILE_PATH"; then
    # ── 已有文件头，只更新 @LastEditors 和 @LastEditTime ──
    sed -i '' "s/@LastEditors:.*/@LastEditors: $AUTHOR /" "$FILE_PATH"
    sed -i '' "s/@LastEditTime:.*/@LastEditTime: $CURRENT_TIME/" "$FILE_PATH"
else
    # ── 新文件，插入完整文件头 ──
    if [[ "$FILE_PATH" == *.vue ]]; then
        HEADER="<!--
 * @Author: $AUTHOR
 * @Date: $CURRENT_TIME
 * @LastEditors: $AUTHOR
 * @LastEditTime: $CURRENT_TIME
 * @Description: ----
 *
 * 页面功能：
 *   ----
 -->
"
    elif [[ "$FILE_PATH" == *.js ]]; then
        HEADER="/*
 * @Author: $AUTHOR
 * @Date: $CURRENT_TIME
 * @LastEditors: $AUTHOR
 * @LastEditTime: $CURRENT_TIME
 * @Description: ----
 *
 * 页面功能：
 *   ----
 */
"
    fi

    printf '%s%s' "$HEADER" "$(cat "$FILE_PATH")" > "$FILE_PATH"
fi

exit 0
