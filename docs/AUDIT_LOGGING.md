# Audit Log Integrity
The audit log now utilizes a SHA-256 hash chain to ensure tamper-evidence. Each log entry includes a hash derived from its own contents and the hash of the preceding entry.

## Verification
Use the internal verification routine to validate the chain. It will report the first `id` where the hash link is broken.
